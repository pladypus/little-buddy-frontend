import { ButtonHTMLAttributes, ReactNode } from "react";

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }
> = (props) => {
  const { children, ...btnProps } = props;

  return <button {...btnProps}>{children}</button>;
};

export default Button;
