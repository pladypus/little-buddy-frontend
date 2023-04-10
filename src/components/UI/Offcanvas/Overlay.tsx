import React, { ReactNode } from "react";

const OffcanvasOverlay: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={`block p-3 border shadow-md h-screen fixed z-30 bg-white border-gray-200 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 inset-y-0 left-0`}
    >
      {children}
    </div>
  );
};

export default OffcanvasOverlay;
