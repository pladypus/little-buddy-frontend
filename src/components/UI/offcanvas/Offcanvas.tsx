import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import OffcanvasBackdrop from "./Backdrop";
import OffcanvasOverlay from "./Overlay";

const Offcanvas: React.FC<{
  onClose: ComponentProps<typeof OffcanvasBackdrop>["onClose"];
  show: boolean;
  children?: ReactNode;
}> = ({ onClose, children, show }) => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!show || !domReady) return null;

  return createPortal(
    <div data-testid="offcanvas-test">
      <OffcanvasBackdrop onClose={onClose} />
      <OffcanvasOverlay>{children}</OffcanvasOverlay>
    </div>,
    document.getElementById("overlays")!
  );
};
export default Offcanvas;
