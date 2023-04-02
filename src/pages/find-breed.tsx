import axios from "axios";
import log from "loglevel";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Input from "~/components/UI/Input/Input";
import { percentChange } from "~/utils/percent-change";

interface pageProps {}

type choices = 0 | 1 | 2 | 3 | 4 | 5;
interface answers {
  height?: { min?: number; max?: number };
  weight?: { min?: number; max?: number };
  life_expectancy?: { min?: number; max?: number };
  shedding?: choices;
  barking?: choices;
  energy?: choices;
  protectiveness?: choices;
  trainability?: choices;
}

interface dogBreed {
  image_link: string;
  good_with_children: number;
  good_with_other_dogs: number;
  shedding: number;
  grooming: number;
  drooling: number;
  coat_length: number;
  good_with_strangers: number;
  playfulness: number;
  protectiveness: number;
  trainability: number;
  energy: number;
  barking: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
  max_height_male: number;
  max_height_female: number;
  max_weight_male: number;
  max_weight_female: number;
  min_height_male: number;
  min_height_female: number;
  min_weight_male: number;
  min_weight_female: number;
  name: string;
}

const FindBreedPage: NextPage<pageProps> = () => {
  const [preferences, setPreferences] = useState<answers>();
  const [top3Breeds, setTop3Breeds] = useState<dogBreed[]>();
  log.debug("🚀 ~ file: find-breed.tsx:54 ~ topBreeds:", top3Breeds);

  useEffect(() => {
    const effect = async () => {
      if (preferences == null) return;
      try {
        const res = await axios.get<dogBreed[]>("/api/dogs", {
          params: {
            min_height: preferences.height?.min,
            max_height: preferences.height?.max,
            min_weight: preferences.weight?.min,
            max_weight: preferences.weight?.max,
            min_life_expectancy: preferences.life_expectancy?.min,
            max_life_expectancy: preferences.life_expectancy?.max,
            shedding: preferences.shedding,
            barking: preferences.barking,
            energy: preferences.energy,
            protectiveness: preferences.protectiveness,
            trainability: preferences.trainability,
          },
        });

        const breeds = [...(top3Breeds ?? []), ...res.data];

        const scoredBreeds = breeds.map((dogBreed, idx) => {
          const {
            min_life_expectancy,
            max_life_expectancy,
            min_height_female,
            max_height_female,
            min_height_male,
            max_height_male,
            min_weight_female,
            max_weight_female,
            min_weight_male,
            max_weight_male,
            drooling,
            image_link,
            name,
            ...simple
          } = dogBreed;

          const simpleScore = Object.entries(simple).reduce((prev, data) => {
            return prev + data[1];
          }, 0);

          const life_expectancy_score = calcLifeExpectancyScore(
            { min: min_life_expectancy, max: max_life_expectancy },
            {
              min: preferences.life_expectancy?.min,
              max: preferences.life_expectancy?.max,
            }
          );

          const height_score = calcHeightWeightScore(
            {
              female: { max: max_height_female, min: min_height_female },
              male: { max: max_height_male, min: min_height_male },
            },
            { max: preferences.height?.max, min: preferences.height?.min }
          );

          const weight_score = calcHeightWeightScore(
            {
              female: { max: max_weight_female, min: min_weight_female },
              male: { max: max_weight_male, min: min_weight_male },
            },
            { max: preferences.height?.max, min: preferences.height?.min }
          );

          const score =
            simpleScore -
            (drooling + life_expectancy_score + height_score + weight_score);

          return { score, idx };
        });

        const topScores = scoredBreeds
          .sort((a, b) => a.score - b.score)
          .slice(0, 3);
        const topBreeds = topScores.map((score) => breeds[score.idx]);

        setTop3Breeds(topBreeds);
      } catch (error) {
        console.log("🚀 ~ file: find-breed.tsx:44 ~ effect ~ error:", error);
      }
    };

    effect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences]);

  return (
    <div>
      <MinMaxQuestion category="height" />
      <ChoiceQuestion category="shedding" />
    </div>
  );
};

export default FindBreedPage;

export const getStaticProps: GetStaticProps<pageProps> = () => {
  return { props: { title: "Find Your Breed" } };
};

const MinMaxQuestion: React.FC<{ category: string }> = ({ category }) => {
  return (
    <div className="grid grid-cols-2">
      <label className="capitalize font-bold">
        Min {category}
        <Input className="font-normal text-black" type="number" />
      </label>
      <label className="capitalize font-bold">
        Max {category}
        <Input className="font-normal text-black" type="number" />
      </label>
    </div>
  );
};

const ChoiceQuestion: React.FC<{ category: string }> = ({ category }) => {
  return (
    <label className="capitalize font-bold">
      {category}:
      <select className="font-normal text-black ml-2">
        <option className="hidden" />
        <option value={0}>{0}</option>
        <option value={1}>{1}</option>
        <option value={2}>{2}</option>
        <option value={3}>{3}</option>
        <option value={4}>{4}</option>
        <option value={5}>{5}</option>
      </select>
    </label>
  );
};

function calcHeightWeightScore(
  results: {
    male: { min: number; max: number };
    female: { min: number; max: number };
  },
  preference: { min?: number; max?: number }
) {
  return (
    percentChange(results.male.min, preference.min ?? results.male.min) +
    percentChange(results.female.min, preference.min ?? results.female.min) +
    percentChange(results.male.max, preference.max ?? results.male.max) +
    percentChange(results.female.max, preference.max ?? results.female.max)
  );
}

function calcLifeExpectancyScore(
  results: { min: number; max: number },
  preference: { min?: number; max?: number }
) {
  return (
    percentChange(results.min, preference.min ?? results.min) +
    percentChange(results.max, preference.max ?? results.max)
  );
}
