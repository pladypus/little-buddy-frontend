import { InputHTMLAttributes } from "react";

/**
 * Input Component with styling applied
 * @param props
 * @returns
 */
const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} data-testid="input-test" />;
};

export default Input;
