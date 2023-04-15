import { gql } from "graphql-request";
import log from "loglevel";
import { Dispatch, SetStateAction } from "react";
import { entity } from "~/pages/my-family";
import gqlClient from "~/utils/grqphql-client";
import AddFamilyMemberBtn, { CreateMemberData } from "./add-family-member-btn";

const InviteMemberBtn: React.FC<{
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
  const createMember = async (formValues: CreateMemberData) => {
    // api call to create dog
    const userMutation = gql`
      mutation {
        createUser(input: { cognitoId: "${Math.random()}", name: "${
      formValues.identifier
    }", familyId: "${familyId}" }) {
          id
          name
        }
      }
    `;

    try {
      const res = await gqlClient.request<{ createUser: entity }>(userMutation);
      log.debug("🚀 ~ file: add-member-btn.tsx:51 ~ createMember ~ res:", res);

      // add dog to family state
      setFamily((prev) => {
        if (prev == null) return;

        return {
          ...prev,
          members: [...prev.members, res.createUser],
        };
      });
    } catch (error) {
      log.error(
        "🚀 ~ file: add-member-btn.tsx:59 ~ createMember ~ error:",
        error
      );
    }
  };

  return (
    <AddFamilyMemberBtn
      btnLable="Invite Member"
      createFn={createMember}
      formLable="Member's Email"
    />
  );
};

export default InviteMemberBtn;
