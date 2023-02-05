import { ReactNode } from "react";

const H3: React.FC<{ children?: ReactNode }> = (props) => {
  const { children, ...genProps } = props;

  return (
    <h3 {...genProps} data-testid="h3-test">
      {children}
    </h3>
  );
};
export default H3;
