import { ButtonHTMLAttributes, ReactNode } from "react";

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }
> = (props) => {
  return <button>{props.children}</button>;
};

export default Button;
