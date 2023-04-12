import { Auth } from "aws-amplify";
import { gql } from "graphql-request";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import gqlClient from "~/utils/grqphql-client";

interface family {
  dogs: {
    items: {
      id: string;
    }[];
  };
  members: {
    items: {
      name: string;
    }[];
  };
}

interface pageProps {
  families: family[];
}

const Home: NextPage<pageProps> = ({ families }) => {
  const router = useRouter();

  useEffect(() => {
    const effect = async () => {
      const userData = await Auth.currentUserInfo();

      const family = families.find((family) =>
        family.members.items.find(
          (member) => member.name === userData.attributes.email
        )
      );

      if (family == null || family.dogs.items.length < 1) {
        router.push("/my-family");
        return;
      }

      router.push(`/${family.dogs.items[0].id}`);
    };

    effect();

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
      listFamilies {
        items {
          dogs {
            items {
              id
            }
          }
          members {
            items {
              name
            }
          }
        }
      }
    }
  `;

  const res = await gqlClient.request<{ listFamilies: { items: family[] } }>(
    query
  );

  console.log("RES", res);

  return {
    props: { families: res.listFamilies.items },
  };
};
