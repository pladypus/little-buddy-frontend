import { HTMLAttributes, ReactNode } from "react";

const Card: React.FC<
  { children?: ReactNode } & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...divProps }) => {
  return (
    <div
      {...divProps}
      className={`block px-6 bg-gray-200 border-2 border-gray-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 ${
        className ?? ""
      }`}
      data-testid="card-test"
    >
      {children}
    </div>
  );
};
export default Card;
