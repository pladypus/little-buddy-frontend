import { ReactNode } from "react";

const H6: React.FC<{ children?: ReactNode }> = (props) => {
  const { children, ...genProps } = props;

  return (
    <h6 {...genProps} data-testid="h6-test">
      {children}
    </h6>
  );
};
export default H6;
