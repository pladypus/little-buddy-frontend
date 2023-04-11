import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
import gqlClient from "~/utils/grqphql-client";

interface pageProps {
  families: any[];
  signOut?: (data?: any) => void;
}

interface newFamilyForm {
  name: string;
}

const CreateFamilyPage: NextPage<pageProps> = ({ families }) => {
  const [family, setFamily] = useState<{
    id: string;
    members: any[];
    dogs: any[];
  }>();
  const { register, handleSubmit } = useForm<newFamilyForm>();

  const [showDogModal, setShowDogModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);

  const mappedMembers = family?.members.map((member) => (
    <li key={member.cognitoId}>{member.name}</li>
  ));
  // const mappedDogs = props.dogs.map((dog) => <li key={dog.id}>{dog.name}</li>);

  const openDogModal = () => setShowDogModal(true);
  const closeDogModal = () => setShowDogModal(false);
  const openMemberModal = () => setShowMemberModal(true);
  const closeMemberModal = () => setShowMemberModal(false);

  const createDog = () => {};

  useEffect(() => {
    const effect = async () => {
      const userData = await Auth.currentUserInfo();

      const apple = families.find((family) =>
        family.members.items.find(
          (member: any) => member.cognitoId === userData.username
        )
      );
      log.debug("USER DATA", { auth: userData, apple, families });
      setFamily({
        id: apple.id,
        members: apple.members.items,
        dogs: apple.dogs.items,
      });
    };

    effect();
  }, []);

  const createFamily = async (formValues: newFamilyForm) => {
    const userData = await Auth.currentUserInfo();
    log.debug(
      "🚀 ~ file: my-family.tsx:52 ~ createFamily ~ userData:",
      userData
    );

    const familyQuery = gql`
      mutation {
        createFamily(input: { ownerId: "${userData.username}" }) {
          id
        }
      }
    `;

    try {
      const familyRes = await gqlClient.request(familyQuery);
      log.debug(
        "🚀 ~ file: my-family.tsx:78 ~ createFamily ~ familyRes:",
        familyRes
      );

      const memberQuery = gql`
        mutation {
          createUser(input: { cognitoId: "${userData.username}", name: "${formValues.name}", familyId: "${familyRes.createFamily.id}" }) {
            id
            name
          }
        }
      `;

      const memberRes = await gqlClient.request(memberQuery);
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
          <div className="flex justify-between items-center px-2">
            <h2 className="text-3xl font-bold dark:text-white">Members</h2>
            <Button className="p-2" onClick={openMemberModal}>
              Invite Member <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
          <ul>{mappedMembers}</ul>
          <hr className="border-gray-500 my-3" />
          <div className="flex justify-between items-center px-2">
            <h2 className="text-3xl font-bold dark:text-white">Dogs</h2>
            {/* {mappedDogs} */}
            <Button onClick={openDogModal} className="p-2">
              Add Dog <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
          <Modal show={showDogModal} onClose={closeDogModal}>
            Dog Modal
          </Modal>
          <Modal show={showMemberModal} onClose={closeMemberModal}>
            Member Modal
          </Modal>
        </>
      ) : (
        <form
          className="flex flex-col gap-2 items-center justify-center mt-44"
          onSubmit={handleSubmit(createFamily)}
        >
          <label className="w-5/6">
            <span className="text-red-500 mr-1 text-lg font-bold">*</span>
            Your Name:
            <Input {...register("name", { required: true })} />
          </label>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-2xl dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-4/6 p-3"
            type="submit"
          >
            Create New Family
          </button>
        </form>
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
              cognitoId
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

  const res = await gqlClient.request(query);
  console.log(res.listFamilies.items);

  return {
    props: {
      families: res.listFamilies.items,
      title: "My Family",
    },
  };
};
