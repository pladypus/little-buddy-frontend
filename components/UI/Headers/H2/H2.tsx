import { ReactNode } from "react";

const H2: React.FC<{ children?: ReactNode }> = (props) => {
  const { children, ...genProps } = props;

  return (
    <h2 {...genProps} data-testid="h2-test">
      {children}
    </h2>
  );
};
export default H2;
