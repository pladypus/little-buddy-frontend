import { InputHTMLAttributes } from "react";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} data-testid="input-test" />;
};
export default Input;
