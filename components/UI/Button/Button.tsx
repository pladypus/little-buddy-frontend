import { ReactNode } from "react";

const Button: React.FC<{ children?: ReactNode }> = (props) => {
  return <button>{props.children}</button>;
};

export default Button;
