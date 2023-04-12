import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql } from "graphql-request";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/UI/Button";
import { Modal } from "~/components/UI/Modal";
import { entity } from "~/pages/my-family";
import gqlClient from "~/utils/grqphql-client";
import Input from "./UI/Input/Input";
import log from "loglevel";

interface formData {
  email: string;
}

const AddMemberBtn: React.FC<{
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
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { register, handleSubmit } = useForm<formData>();

  const createMember = async (formValues: formData) => {
    // api call to create dog
    const userMutation = gql`
      mutation {
        createUser(input: { cognitoId: "${Math.random()}", name: "${
      formValues.email
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
      closeModal();
    } catch (error) {
      log.error(
        "🚀 ~ file: add-member-btn.tsx:59 ~ createMember ~ error:",
        error
      );
    }
  };

  return (
    <>
      <Button onClick={openModal} className="p-2">
        Invite Member <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Modal show={showModal} onClose={closeModal}>
        <form onSubmit={handleSubmit(createMember)}>
          <label>
            Member&apos;s Email:
            <Input {...register("email")} />
          </label>
          <Button type="submit" className="p-2 w-full mt-2">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddMemberBtn;
