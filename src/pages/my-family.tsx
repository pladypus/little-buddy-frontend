import { faCross, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth } from "aws-amplify";
import { gql } from "graphql-request";
import log from "loglevel";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/UI/Button";
import Input from "~/components/UI/Input/Input";
import { Modal } from "~/components/UI/Modal";
import AddDogBtn from "~/components/add-dog-btn";
import AddMemberBtn from "~/components/add-member-btn";
import gqlClient from "~/utils/grqphql-client";

interface pageProps {
  families: {
    id: string;
    members: {
      items: entity[];
    };
    dogs: {
      items: entity[];
    };
  }[];
  signOut?: (data?: any) => void;
}

export interface entity {
  id: string;
  name: string;
}

const CreateFamilyPage: NextPage<pageProps> = ({ families }) => {
  const [family, setFamily] = useState<{
    id: string;
    members: entity[];
    dogs: entity[];
  }>();

  const [showMemberModal, setShowMemberModal] = useState(false);

  const mappedMembers = family?.members.map((member) => (
    <li key={member.id} className="flex justify-between items-center">
      {member.name}
      <FontAwesomeIcon icon={faXmark} />
    </li>
  ));
  const mappedDogs = family?.dogs.map((dog) => (
    <li key={dog.id} className="flex justify-between items-center">
      {dog.name}
      <FontAwesomeIcon icon={faXmark} />
    </li>
  ));

  const openMemberModal = () => setShowMemberModal(true);
  const closeMemberModal = () => setShowMemberModal(false);

  // const createMember = async (formValues:) => {
  //   const memberMutation = gql`
  //       mutation {
  //         createUser(input: { cognitoId: "${userData.username}", name: "${userData.attributes.email}", familyId: "${familyRes.createFamily.id}" }) {
  //           id
  //           name
  //         }
  //       }
  //     `;
  //   // api call to create user
  //   // add user to family state
  // };

  useEffect(() => {
    const effect = async () => {
      const userData = await Auth.currentUserInfo();

      const apple = families.find((family) =>
        family.members.items.find(
          (member: any) => member.name === userData.attributes.email
        )
      );
      log.debug("USER DATA", { auth: userData, apple, families });

      if (apple == null) return;

      setFamily({
        id: apple.id,
        members: apple.members.items,
        dogs: apple.dogs.items,
      });
    };

    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createFamily = async () => {
    const userData = await Auth.currentUserInfo();
    log.debug(
      "🚀 ~ file: my-family.tsx:52 ~ createFamily ~ userData:",
      userData
    );

    const familyMutation = gql`
      mutation {
        createFamily(input: { ownerId: "${userData.username}" }) {
          id
        }
      }
    `;

    try {
      const familyRes = await gqlClient.request(familyMutation);
      log.debug(
        "🚀 ~ file: my-family.tsx:78 ~ createFamily ~ familyRes:",
        familyRes
      );

      const memberMutation = gql`
        mutation {
          createUser(input: { cognitoId: "${userData.username}", name: "${userData.attributes.email}", familyId: "${familyRes.createFamily.id}" }) {
            id
            name
          }
        }
      `;

      const memberRes = await gqlClient.request(memberMutation);
      log.debug(
        "🚀 ~ file: my-family.tsx:90 ~ createFamily ~ memberRes:",
        memberRes
      );

      setFamily({
        id: familyRes.createFamily.id,
        members: [memberRes.createUser],
        dogs: [],
      });
    } catch (error) {
      log.error("🚀 ~ file: my-family.tsx:149 ~ createFamily ~ error:", error);
    }
  };

  const hasFamily = family != null;

  return (
    <main className="flex-grow">
      {hasFamily ? (
        <>
          <div className="flex justify-between items-center px-2 mt-4">
            <h2 className="text-3xl font-bold dark:text-white">Members</h2>
            <AddMemberBtn familyId={family.id} setFamily={setFamily} />
          </div>
          <ul className="mt-2 w-5/6 mx-auto">{mappedMembers}</ul>
          <hr className="border-gray-500 my-3" />
          <div className="flex justify-between items-center px-2">
            <h2 className="text-3xl font-bold dark:text-white">Dogs</h2>
            <AddDogBtn familyId={family.id} setFamily={setFamily} />
          </div>
          <ul className="mt-2 w-5/6 mx-auto">{mappedDogs}</ul>
        </>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center mt-52">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-2xl dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-4/6 p-3"
            onClick={createFamily}
          >
            Create New Family
          </button>
        </div>
      )}
    </main>
  );
};

export default CreateFamilyPage;

export const getStaticProps: GetStaticProps<pageProps> = async (ctx) => {
  console.log(ctx);

  const query = gql`
    query {
      listFamilies {
        items {
          id
          members {
            items {
              id
              name
            }
          }
          dogs {
            items {
              id
              name
            }
          }
        }
      }
    }
  `;

  try {
    const res = await gqlClient.request(query);
    console.log(res.listFamilies.items);

    return {
      props: {
        families: res.listFamilies.items,
        title: "My Family",
      },
    };
  } catch (error) {
    log.debug(
      "🚀 ~ file: my-family.tsx:202 ~ constgetStaticProps:GetStaticProps<pageProps>= ~ error:",
      error
    );
    return {
      props: {
        families: [],
        title: "My Family",
      },
    };
  }
};
