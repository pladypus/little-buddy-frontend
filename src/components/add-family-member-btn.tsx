import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/UI/Button";
import { Modal } from "~/components/UI/Modal";
import { entity } from "~/pages/my-family";
import Input from "./UI/Input/Input";
import log from "loglevel";

export interface CreateMemberData {
  identifier: string;
}

const AddFamilyMemberBtn: React.FC<{
  createFn: (formValues: CreateMemberData) => void;
  btnLable: string;
  formLable: string;
}> = ({ createFn, btnLable, formLable }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { register, handleSubmit } = useForm<CreateMemberData>();

  const submitHandler = async (formValues: CreateMemberData) => {
    try {
      await createFn(formValues);
      closeModal();
    } catch (error) {
      log.error(
        "🚀 ~ file: add-family-member-btn.tsx:31 ~ submitHandler ~ error:",
        error
      );
    }
  };

  return (
    <>
      <Button onClick={openModal} className="p-2">
        {btnLable} <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Modal show={showModal} onClose={closeModal}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label>
            {formLable}:
            <Input {...register("identifier")} />
          </label>
          <Button type="submit" className="p-2 w-full mt-2">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddFamilyMemberBtn;
