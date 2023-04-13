import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { scoreBreeds } from "./score";

const DUMMY_BREED_1 = {
  image_link: "image link",
  good_with_children: 1,
  good_with_other_dogs: 1,
  shedding: 1,
  grooming: 1,
  drooling: 1,
  coat_length: 1,
  good_with_strangers: 1,
  playfulness: 1,
  protectiveness: 1,
  trainability: 1,
  energy: 1,
  barking: 1,
  min_life_expectancy: 1,
  max_life_expectancy: 1,
  max_height_male: 1,
  max_height_female: 1,
  max_weight_male: 1,
  max_weight_female: 1,
  min_height_male: 1,
  min_height_female: 1,
  min_weight_male: 1,
  min_weight_female: 1,
  name: "fake breed",
};

const DUMMY_BREED_2 = {
  image_link: "image link",
  good_with_children: 1,
  good_with_other_dogs: 1,
  shedding: 1,
  grooming: 1,
  drooling: 1,
  coat_length: 1,
  good_with_strangers: 1,
  playfulness: 1,
  protectiveness: 1,
  trainability: 1,
  energy: 2,
  barking: 3,
  min_life_expectancy: 1,
  max_life_expectancy: 1,
  max_height_male: 1,
  max_height_female: 1,
  max_weight_male: 1,
  max_weight_female: 1,
  min_height_male: 1,
  min_height_female: 1,
  min_weight_male: 1,
  min_weight_female: 1,
  name: "fake breed",
};

describe("Score Function", () => {
  test("returns scored array", () => {
    const apple = scoreBreeds([DUMMY_BREED_1, DUMMY_BREED_2], {
      barking: 3,
      energy: 2,
    });

    expect(apple).toEqual([
      { idx: 0, score: 10 },
      { idx: 1, score: 13 },
    ]);
  });

  test("lowers score because of weight", () => {
    const apple = scoreBreeds([DUMMY_BREED_1], {
      barking: 3,
      energy: 2,
      weightMin: 5,
      weightMax: 25,
    });

    expect(apple[0].score).toBeLessThan(10);
  });

  test("lowers score because of height", () => {
    const apple = scoreBreeds([DUMMY_BREED_1], {
      barking: 3,
      energy: 2,
      heightMin: 5,
      heightMax: 25,
    });

    expect(apple[0].score).toBeLessThan(10);
  });

  test("lowers score because of life expectancy", () => {
    const apple = scoreBreeds([DUMMY_BREED_1], {
      barking: 3,
      energy: 2,
      life_expectancyMin: 5,
      life_expectancyMax: 12,
    });

    expect(apple[0].score).toBeLessThan(10);
  });

  test("lowers score because of drooling", () => {
    const apple = scoreBreeds([{ ...DUMMY_BREED_1, drooling: 4 }], {
      barking: 3,
      energy: 2,
    });

    expect(apple[0].score).toBeLessThan(10);
  });
});
