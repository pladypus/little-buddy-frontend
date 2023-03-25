import { GetStaticProps, NextPage } from "next";

interface pageProps {}

const FindBreedPage: NextPage<pageProps> = () => {
  return <div>FindBreedPage</div>;
};

export default FindBreedPage;

export const getStaticProps: GetStaticProps<pageProps> = () => {
  return { props: { title: "Find Your Breed" } };
};
