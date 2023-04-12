import {
  faBars,
  faBowlFood,
  faCircleUser,
  faDog,
  faDroplet,
  faPoop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth } from "aws-amplify";
import { gql } from "graphql-request";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import DarkModeCtrl from "~/components/dark-mode-ctrl/DarkModeCtrl";
import EventBtn, { eventType } from "~/components/event-btn";
import MainNav from "~/components/MainNav";
import Card from "~/components/UI/Card";
import { H1 } from "~/components/UI/Headers";
import gqlClient from "~/utils/grqphql-client";

interface event {
  id: string;
  type: eventType;
  createdAt: string;
}

interface dog {
  id: string;
  family: { members: { items: { name: string }[] } };
}

interface pageProps {
  events: event[];
  dogs: dog[];
  signOut?: (data?: any) => void;
}

const SpecificDogPage: NextPage<pageProps> = (props) => {
  const [events, setEvents] = useState(props.events);
  const [familyDogs, setFamilyDogs] = useState<dog[]>();

  useEffect(() => {
    setEvents(props.events);
  }, [props.events]);

  useEffect(() => {
    const effect = async () => {
      const userData = await Auth.currentUserInfo();

      const filteredDogs = props.dogs.filter((dog) =>
        dog.family.members.items.find(
          (member) => member.name === userData.attributes.email
        )
      );

      setFamilyDogs(filteredDogs);
    };

    effect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mappedEvents = events.map((event) => {
    return (
      <div className="flex space-x-2" key={event.id}>
        <span className="font-bold">
          {new Date(event.createdAt).toLocaleString()}:
        </span>
        <p className="capitalize">{event.type}</p>
      </div>
    );
  });

  const mappedDogs = familyDogs?.map((dog) => {
    return (
      <Link href={`/${dog.id}`} key={dog.id}>
        <FontAwesomeIcon icon={faCircleUser} size="4x" />
      </Link>
    );
  });

  return (
    <>
      <main className="mx-3 mt-3 mb-5 flex-grow flex flex-col">
        <Card id="event-log" className="my-2 h-[28rem] overflow-y-scroll">
          {mappedEvents}
        </Card>
        <div id="action-btns" className="grid grid-cols-2 mt-3 gap-4">
          <EventBtn icon={faDroplet} type="pee" setEvents={setEvents} />
          <EventBtn icon={faPoop} type="poop" setEvents={setEvents} />
          <EventBtn icon={faBowlFood} type="feed" setEvents={setEvents} />
          <EventBtn icon={faDog} type="walk" setEvents={setEvents} />
        </div>
      </main>
      <footer
        id="dog-selector"
        className="flex px-3 pb-5 overflow-x-auto space-x-3 justify-between"
      >
        {mappedDogs}
      </footer>
    </>
  );
};

export default SpecificDogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query {
      listDogs {
        items {
          id
        }
      }
    }
  `;
  try {
    const res = await gqlClient.request(query);

    const paths = res.listDogs.items.map((dog: any) => {
      return { params: { dogId: dog.id } };
    });

    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<pageProps> = async (ctx) => {
  const query = gql`
    query {
      getDog(id: "${ctx.params?.dogId}") {
        name
        events {
          items {
            id
            type
            createdAt
          }
        }
      }
      listDogs {
        items {
          id
          family {
            members {
              items {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await gqlClient.request<{
      getDog: { name: string; events: { items: event[] } };
      listDogs: {
        items: {
          id: string;
          family: { members: { items: { name: string }[] } };
        }[];
      };
    }>(query);

    console.log("RES", res);

    const { name, events } = res.getDog;
    const dogs = res.listDogs.items;

    console.log("PROPS", { events: events.items, name, dogs });

    return {
      props: { events: events.items, title: name, dogs },
    };
  } catch (error) {
    return {
      props: { events: [], title: "", dogs: [] },
    };
  }
};
