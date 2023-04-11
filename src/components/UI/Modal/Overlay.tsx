import React, { ReactNode } from "react";

const ModalOverlay: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <div className="max-w-xs p-6 z-30 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ">
      {children}
    </div>
  );
};

export default ModalOverlay;
