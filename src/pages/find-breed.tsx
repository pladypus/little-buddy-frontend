import axios from "axios";
import log from "loglevel";
import { GetStaticProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import Button from "~/components/UI/Button";
import Input from "~/components/UI/Input/Input";
import { percentChange } from "~/utils/percent-change";
import { randomProperty } from "~/utils/property-select";
import Image from "next/image";

interface pageProps {}

type choices = 0 | 1 | 2 | 3 | 4 | 5 | null;
type qObj = { min?: number; max?: number };
interface answers {
  height: qObj;
  weight: qObj;
  life_expectancy: qObj;
  shedding: choices;
  barking: choices;
  energy: choices;
  protectiveness: choices;
  trainability: choices;
}
interface apiData {
  heightMin?: number;
  heightMax?: number;
  weightMin?: number;
  weightMax?: number;
  life_expectancyMin?: number;
  life_expectancyMax?: number;
  shedding?: NonNullable<choices>;
  barking?: NonNullable<choices>;
  energy?: NonNullable<choices>;
  protectiveness?: NonNullable<choices>;
  trainability?: NonNullable<choices>;
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

const apple: (keyof answers)[] = [
  "barking",
  "energy",
  "protectiveness",
  "shedding",
  "trainability",
  "height",
  "life_expectancy",
  "weight",
];

const FindBreedPage: NextPage<pageProps> = () => {
  const [question, setQuestion] = useState<{
    JSX: ReactNode;
    getNew: boolean;
    finished: boolean;
  }>({ JSX: null, getNew: true, finished: false });
  const [top3Breeds, setTop3Breeds] = useState<dogBreed[]>();
  const { register, handleSubmit, getValues, reset } = useForm<apiData>();

  useEffect(() => {
    if (!question.getNew || question.finished) return;

    const existingKeys = Object.keys(getValues()).map((key) => {
      const keyGroup = key.match(/^(\w*)(Min|Max)$/);
      return keyGroup == null ? key : keyGroup[1];
    });
    log.debug("🚀 ~ file: find-breed.tsx:108 ~ existingKeys ~ existingKeys:", {
      existingKeys,
      values: getValues(),
    });

    // pick random new question
    const newQuestion = randomProperty(apple, existingKeys) as keyof answers;

    setQuestion((prev) => {
      return {
        ...prev,
        JSX: isMinMax(newQuestion) ? (
          <MinMaxQuestion category={newQuestion} register={register} />
        ) : (
          <ChoiceQuestion category={newQuestion} register={register} />
        ),
        getNew: false,
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.getNew]);

  const resetPage = () => {
    setTop3Breeds(undefined);
    reset();
    setQuestion({ getNew: true, finished: false, JSX: <></> });
  };

  const submitPreference = async (formValues: apiData) => {
    try {
      const res = await axios.get<dogBreed[]>("/api/dogs", {
        params: {
          min_height: formValues.heightMin,
          max_height: formValues.heightMax,
          min_weight: formValues.weightMin,
          max_weight: formValues.weightMax,
          min_life_expectancy: formValues.life_expectancyMin,
          max_life_expectancy: formValues.life_expectancyMax,
          shedding: formValues.shedding,
          barking: formValues.barking,
          energy: formValues.energy,
          protectiveness: formValues.protectiveness,
          trainability: formValues.trainability,
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
            min: formValues.life_expectancyMin,
            max: formValues.life_expectancyMax,
          }
        );

        const height_score = calcHeightWeightScore(
          {
            female: { max: max_height_female, min: min_height_female },
            male: { max: max_height_male, min: min_height_male },
          },
          { max: formValues.heightMax, min: formValues.heightMin }
        );

        const weight_score = calcHeightWeightScore(
          {
            female: { max: max_weight_female, min: min_weight_female },
            male: { max: max_weight_male, min: min_weight_male },
          },
          { max: formValues.weightMax, min: formValues.weightMin }
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

      // if to many breeds get new question
      if (res.data.length > 3)
        setQuestion((prev) => {
          return { ...prev, getNew: true };
        });
      else {
        setQuestion((prev) => {
          return { ...prev, finished: true };
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: find-breed.tsx:44 ~ effect ~ error:", error);
    }
  };

  const mappedBreeds = top3Breeds?.map((breed) => (
    <DogBreed {...breed} key={Math.random()} />
  ));

  return (
    <div className="flex-grow">
      {!question.finished ? (
        <form onSubmit={handleSubmit(submitPreference)} className="mt-36 px-4">
          {question.JSX}
          <Button className="p-3 mt-4 block mx-auto w-4/6" type="submit">
            Next
          </Button>
        </form>
      ) : (
        <>
          {mappedBreeds}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg px-4 py-2 text-lg block mx-auto my-2 w-4/6"
            onClick={resetPage}
          >
            Take Again
          </button>
        </>
      )}
    </div>
  );
};

export default FindBreedPage;

export const getStaticProps: GetStaticProps<pageProps> = () => {
  return { props: { title: "Find Your Breed" } };
};

const MinMaxQuestion: React.FC<{
  category: keyof Pick<answers, "height" | "life_expectancy" | "weight">;
  register: UseFormRegister<apiData>;
}> = ({ category, register }) => {
  const labelText = category.replace(/_/, " ");

  return (
    <div className="grid grid-row-2 gap-4">
      <label className="capitalize font-bold">
        Min {labelText}
        <Input
          className="font-normal text-black"
          type="number"
          {...register(`${category}Min`)}
        />
      </label>
      <label className="capitalize font-bold">
        Max {labelText}
        <Input
          className="font-normal text-black"
          type="number"
          {...register(`${category}Max`)}
        />
      </label>
    </div>
  );
};

const ChoiceQuestion: React.FC<{
  category: keyof Omit<answers, "height" | "life_expectancy" | "weight">;
  register: UseFormRegister<apiData>;
}> = ({ category, register }) => {
  return (
    <label className="capitalize font-bold">
      {category}:
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(category)}
      >
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
  preference: qObj
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
  preference: qObj
) {
  return (
    percentChange(results.min, preference.min ?? results.min) +
    percentChange(results.max, preference.max ?? results.max)
  );
}

function isMinMax(
  val: string
): val is keyof Pick<answers, "height" | "life_expectancy" | "weight"> {
  return val === "height" || val === "weight" || val === "life_expectancy";
}

const DogBreed: React.FC<dogBreed> = ({ image_link, name, ...breedData }) => {
  const mappedData = Object.keys(breedData).map((key) => {
    const displayName = key.replaceAll(/_/g, " ");

    return (
      <li key={Math.random()}>
        <span className="capitalize mr-2 font-bold">{displayName}:</span>
        {breedData[key as keyof typeof breedData]}
      </li>
    );
  });

  return (
    <div className="border-y pb-2">
      <h2 className="text-center text-2xl font-extrabold my-2">{name}</h2>
      <Image
        src={image_link}
        alt={name}
        width={300}
        height={300}
        className="mx-auto"
      />
      <ul className="ml-4">{mappedData}</ul>
    </div>
  );
};
