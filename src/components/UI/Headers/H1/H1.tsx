import { HTMLAttributes, ReactNode } from "react";

const H1: React.FC<
  HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }
> = ({ children, className, ...h1Props }) => {
  return (
    <h1
      {...h1Props}
      className={`text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white ${
        className ?? ""
      }`}
      data-testid="h1-test"
    >
      {children}
    </h1>
  );
};
export default H1;
