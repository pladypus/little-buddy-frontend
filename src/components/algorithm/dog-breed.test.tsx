import { render, screen } from "@testing-library/react";
import DogBreed from "./dog-breed";

const DUMMY_BREED = {
  image_link: "https://api-ninjas.com/images/dogs/golden_retriever.jpg",
  good_with_children: 5,
  good_with_other_dogs: 5,
  shedding: 4,
  grooming: 2,
  drooling: 2,
  coat_length: 1,
  good_with_strangers: 5,
  playfulness: 4,
  protectiveness: 3,
  trainability: 5,
  energy: 3,
  barking: 1,
  min_life_expectancy: 10,
  max_life_expectancy: 12,
  max_height_male: 24,
  max_height_female: 24,
  max_weight_male: 75,
  max_weight_female: 65,
  min_height_male: 23,
  min_height_female: 23,
  min_weight_male: 65,
  min_weight_female: 55,
  name: "Golden Retriever",
};

describe("Dog Breed", () => {
  test("renders without error", () => {
    render(<DogBreed {...DUMMY_BREED} />);

    const breedElement = screen.getByTestId(/dog-breed-test/i);
    expect(breedElement).toBeInTheDocument;
  });

  test("renders breed data", () => {
    render(<DogBreed {...DUMMY_BREED} />);

    const { image_link, name, ...filteredKeys } = DUMMY_BREED;

    Object.keys(filteredKeys).forEach((key) => {
      const displayName = key.replaceAll(/_/g, " ");

      const keyElement = screen.getByText(`${displayName}:`);
      expect(keyElement).toBeInTheDocument;
    });
  });

  test("renders breed name", () => {
    render(<DogBreed {...DUMMY_BREED} />);

    const breedName = screen.getByText(/Golden Retriever/i);
    expect(breedName).toBeInTheDocument;
  });

  test("renders breed image", () => {
    render(<DogBreed {...DUMMY_BREED} />);

    const breedElement = screen.getByAltText(/Golden Retriever-image/i);
    expect(breedElement).toBeInTheDocument;
  });
});
