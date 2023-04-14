import Image from "next/image";
import { dogBreed } from "~/pages/find-breed";

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
    <div className="border-y pb-2" data-testid="dog-breed-test">
      <h2 className="text-center text-2xl font-extrabold my-2">{name}</h2>
      <Image
        src={image_link}
        alt={`${name}-image`}
        width={300}
        height={300}
        className="mx-auto"
      />
      <ul className="ml-4">{mappedData}</ul>
    </div>
  );
};

export default DogBreed;
