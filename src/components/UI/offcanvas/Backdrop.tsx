import React from "react";

const OffcanvasBackdrop: React.FC<{
  onClose: React.MouseEventHandler<HTMLDivElement>;
}> = (props) => {
  return (
    <div
      id="offcanvas-backdrop"
      tabIndex={-1}
      className="fixed top-0 left-0 z-20 w-full h-screen bg-black opacity-50"
      onClick={props.onClose}
    />
  );
};

export default OffcanvasBackdrop;
