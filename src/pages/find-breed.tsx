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
import { useQuestionSelect } from "~/hooks/useQuestionSelect";
import DogBreed from "~/components/algorithm/dog-breed";
import { scoreBreeds } from "~/utils/algorithm/score";

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
export interface apiData {
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

export interface dogBreed {
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
  const { register, handleSubmit, getValues, reset } = useForm<apiData>();
  const {
    question,
    setGetNewQuestion,
    setIsFinished,
    setQuestion,
    isFinished,
  } = useQuestionSelect({ getValues, register });
  const [top3Breeds, setTop3Breeds] = useState<dogBreed[]>();

  const resetPage = () => {
    setTop3Breeds(undefined);
    reset();
    setQuestion(null);
    setGetNewQuestion(true);
    setIsFinished(false);
  };

  const submitPreference = async (formValues: apiData) => {
    log.debug(
      "🚀 ~ file: find-breed.tsx:135 ~ submitPreference ~ formValues:",
      formValues
    );
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
      log.debug("🚀 ~ file: find-breed.tsx:155 ~ submitPreference ~ res:", res);

      const breeds = [...(top3Breeds ?? []), ...res.data];

      const evaledBreeds = scoreBreeds(breeds, formValues);

      const topScores = evaledBreeds
        .sort((a, b) => a.score - b.score)
        .slice(0, 3);
      const topBreeds = topScores.map((score) => breeds[score.idx]);
      log.debug(
        "🚀 ~ file: find-breed.tsx:216 ~ submitPreference ~ topBreeds:",
        topBreeds
      );

      setTop3Breeds(topBreeds);

      // if to many breeds get new question
      if (res.data.length > 3) {
        log.debug("GET NEW QUESTION");
        setGetNewQuestion(true);
      } else {
        setIsFinished(true);
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
      {!isFinished ? (
        <form onSubmit={handleSubmit(submitPreference)} className="mt-36 px-4">
          {question}
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
