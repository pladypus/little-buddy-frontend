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
  name: string;
}

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
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { register, handleSubmit } = useForm<formData>();

  const createDog = async (formValues: formData) => {
    // api call to create dog
    const dogMutation = gql`
      mutation {
        createDog(input: { name: "${formValues.name}", familyId: "${familyId}" }) {
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
      closeModal();
    } catch (error) {
      log.error("🚀 ~ file: add-dog-btn.tsx:62 ~ createDog ~ error:", error);
    }
  };

  return (
    <>
      <Button onClick={openModal} className="p-2">
        Add Dog <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Modal show={showModal} onClose={closeModal}>
        <form onSubmit={handleSubmit(createDog)}>
          <label>
            Dog&apos;s Name:
            <Input {...register("name")} />
          </label>
          <Button type="submit" className="p-2 w-full mt-2">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddDogBtn;
