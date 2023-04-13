import { apiData, dogBreed } from "~/pages/find-breed";
import { percentChange } from "../percent-change";

type qObj = { min?: number; max?: number };

export const scoreBreeds = (breeds: dogBreed[], preferences: apiData) => {
  return breeds.map((dogBreed, idx) => {
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
        min: preferences.life_expectancyMin,
        max: preferences.life_expectancyMax,
      }
    );

    const height_score = calcHeightWeightScore(
      {
        female: { max: max_height_female, min: min_height_female },
        male: { max: max_height_male, min: min_height_male },
      },
      { max: preferences.heightMax, min: preferences.heightMin }
    );

    const weight_score = calcHeightWeightScore(
      {
        female: { max: max_weight_female, min: min_weight_female },
        male: { max: max_weight_male, min: min_weight_male },
      },
      { max: preferences.weightMax, min: preferences.weightMin }
    );

    const score =
      simpleScore -
      (drooling + life_expectancy_score + height_score + weight_score);

    return { score, idx };
  });
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
