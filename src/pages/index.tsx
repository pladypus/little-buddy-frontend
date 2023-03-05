import {
  faBars,
  faBowlFood,
  faCircleUser,
  faDog,
  faDroplet,
  faPoop,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql } from "graphql-request";
import log from "loglevel";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DarkModeCtrl from "~/components/dark-mode-ctrl/DarkModeCtrl";
import Button from "~/components/UI/Button";
import Card from "~/components/UI/Card";
import { H1 } from "~/components/UI/Headers";
import gqlClient from "~/utils/grqphql-client";

interface pageProps {
  events: any[];
  dogs: any[];
  name: string;
}

const Home: NextPage<pageProps> = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/${props.dogs[0].id}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
  // const mappedEvents = props.events.map((event) => {
  //   return (
  //     <div className="flex space-x-2" key={event.id}>
  //       <span className="font-bold">
  //         {new Date(event.createdAt).toLocaleString()}:
  //       </span>
  //       <p>{event.type}</p>
  //     </div>
  //   );
  // });

  // const mappedDogs = props.dogs.map((dog) => {
  //   return (
  //     <Link href={`/${dog.id}`} key={dog.id}>
  //       <FontAwesomeIcon icon={faCircleUser} size="4x" />
  //     </Link>
  //   );
  // });

  // return (
  //   <>
  //     <header className="flex items-center pt-3 px-3">
  //       <FontAwesomeIcon icon={faBars} size="3x" />
  //       <H1 className="flex-grow text-center">{props.name}</H1>
  //       <DarkModeCtrl />
  //     </header>
  //     <main className="mx-3 mt-3 mb-5 flex-grow flex flex-col">
  //       <Card id="event-log" className="my-2 h-[29.7rem] overflow-y-scroll">
  //         {mappedEvents}
  //       </Card>
  //       <div id="action-btns" className="grid grid-cols-2 mt-3 gap-3">
  //         <Button className="text-xl p-5">
  //           Pee <FontAwesomeIcon icon={faDroplet} />
  //         </Button>
  //         <Button className="text-xl p-5">
  //           Poop <FontAwesomeIcon icon={faPoop} />
  //         </Button>
  //         <Button className="text-xl p-5">
  //           Feed <FontAwesomeIcon icon={faBowlFood} />
  //         </Button>
  //         <Button className="text-xl p-5">
  //           Walk <FontAwesomeIcon icon={faDog} />
  //         </Button>
  //       </div>
  //     </main>
  //     <footer
  //       id="dog-selector"
  //       className="flex px-3 pb-5 overflow-x-auto space-x-3 justify-between"
  //     >
  //       {mappedDogs}
  //     </footer>
  //   </>
  // );
};

export default Home;

export const getServerSideProps: GetServerSideProps<pageProps> = async () => {
  const query = gql`
    query {
      listDogs {
        items {
          id
          name
          events {
            items {
              id
              type
              createdAt
            }
          }
        }
      }
    }
  `;

  const res = await gqlClient.request(query);

  console.log("RES", res);

  const dogs = res.listDogs.items.map((dog: any) => {
    return { id: dog.id };
  });

  const events = res.listDogs.items[0].events.items;
  const name = res.listDogs.items[0].name;

  console.log("PROPS", { events, name, dogs });

  return {
    props: { events, name, dogs },
  };
};
