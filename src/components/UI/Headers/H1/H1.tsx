import { HTMLAttributes, ReactNode } from "react";

const H1: React.FC<
  HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }
> = (props) => {
  const { children, ...genProps } = props;

  return (
    <h1 {...genProps} data-testid="h1-test">
      {children}
    </h1>
  );
};
export default H1;
