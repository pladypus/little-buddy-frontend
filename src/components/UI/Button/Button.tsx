import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button Component with styling applied
 * @param props
 * @returns JSX Elecment
 */
const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }
> = ({ children, className, ...btnProps }) => {
  return (
    <button
      data-testid="button-test"
      {...btnProps}
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
