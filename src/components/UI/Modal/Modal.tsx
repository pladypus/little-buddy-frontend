import { ComponentProps, ReactNode, useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import { createPortal } from "react-dom";
import ModalOverlay from "./Overlay";

const Modal: React.FC<{
  onClose: ComponentProps<typeof Backdrop>["onClose"];
  show: boolean;
  children?: ReactNode;
}> = ({ onClose, show, children }) => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!show || !domReady) return null;

  return createPortal(
    <div data-testid="modal-test">
      <Backdrop onClose={onClose} />
      <ModalOverlay>{children}</ModalOverlay>
    </div>,
    document.getElementById("overlays")!
  );
};

export default Modal;
