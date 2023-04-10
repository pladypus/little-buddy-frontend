import { ComponentProps, ReactNode } from "react";
import Backdrop from "../Backdrop";

const Modal: React.FC<{
  onClose: ComponentProps<typeof Backdrop>["onClose"];
  show: boolean;
  children?: ReactNode;
}> = ({ onClose, show, children }) => {
  return <div data-testid="modal-test">{children}</div>;
};

export default Modal;
