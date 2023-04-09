import { InputHTMLAttributes, forwardRef } from "react";

/**
 * Input Component with styling applied
 * @param props
 * @returns JSX Elecment
 */
// eslint-disable-next-line react/display-name
const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      data-testid="input-test"
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:ring-blue-500 dark:focus:border-blue-500 ${props.className}`}
    />
  );
});

export default Input;
