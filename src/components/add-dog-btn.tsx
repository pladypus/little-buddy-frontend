import { gql } from "graphql-request";
import log from "loglevel";
import { Dispatch, SetStateAction } from "react";
import { entity } from "~/pages/my-family";
import gqlClient from "~/utils/grqphql-client";
import AddFamilyMemberBtn, { CreateMemberData } from "./add-family-member-btn";

const AddDogBtn: React.FC<{
  familyId: string;
  setFamily: Dispatch<
    SetStateAction<
      | {
          id: string;
          members: entity[];
          dogs: entity[];
        }
      | undefined
    >
  >;
}> = ({ familyId, setFamily }) => {
  const createDog = async (formValues: CreateMemberData) => {
    // api call to create dog
    const dogMutation = gql`
      mutation {
        createDog(input: { name: "${formValues.identifier}", familyId: "${familyId}" }) {
          id
          name
        }
      }
    `;

    try {
      const res = await gqlClient.request<{ createDog: entity }>(dogMutation);
      log.debug("🚀 ~ file: add-dog-btn.tsx:47 ~ createDog ~ res:", res);

      // add dog to family state
      setFamily((prev) => {
        if (prev == null) return;

        return {
          ...prev,
          dogs: [...prev.dogs, res.createDog],
        };
      });
    } catch (error) {
      log.error("🚀 ~ file: add-dog-btn.tsx:62 ~ createDog ~ error:", error);
    }
  };

  return (
    <AddFamilyMemberBtn
      btnLable="Add Dog"
      createFn={createDog}
      formLable="Dog's Name"
    />
  );
};

export default AddDogBtn;
