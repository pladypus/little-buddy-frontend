import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button Component with styling applied
 * @param props
 * @returns JSX Elecment
 */
const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }
> = (props) => {
  const { children, ...btnProps } = props;

  return (
    <button {...btnProps} data-testid="button-test">
      {children}
    </button>
  );
};

export default Button;
