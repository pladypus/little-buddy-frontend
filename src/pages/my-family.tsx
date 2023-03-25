import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import DarkModeCtrl from "~/components/dark-mode-ctrl/DarkModeCtrl";
import Button from "~/components/UI/Button";
import { H1 } from "~/components/UI/Headers";
import gqlClient from "~/utils/grqphql-client";

interface pageProps {
  members: any[];
  dogs: any[];
  signOut?: (data?: any) => void;
}

const CreateFamilyPage: NextPage<pageProps> = (props) => {
  const mappedMembers = props.members.map((member) => (
    <li key={member.id}>{member.name}</li>
  ));
  const mappedDogs = props.members.map((dog) => (
    <li key={dog.id}>{dog.name}</li>
  ));

  return (
    <div>
      <h2>Members</h2>
      {mappedMembers}
      <Button>
        Invite Member <FontAwesomeIcon icon={faPlus} />
      </Button>
      <h2>Dogs</h2>
      {mappedDogs}
      <Button>
        Add Dog <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
};

export default CreateFamilyPage;

export const getStaticProps: GetStaticProps<pageProps> = async (ctx) => {
  // const query = gql`
  //   query {
  //   }
  // `;

  // const res = await gqlClient.request(query);

  // console.log("RES", res);

  // const { name, events } = res.getDog;
  // const dogs = res.listDogs.items;

  // console.log("PROPS", { events: events.items, name, dogs });

  return {
    props: {
      members: [{ name: "apple pie", id: Math.random() }],
      dogs: [{ name: "Bella", id: Math.random() }],
      title: "My Family",
    },
  };
};
