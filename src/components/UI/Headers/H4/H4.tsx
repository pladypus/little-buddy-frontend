import { ReactNode } from "react";

const H4: React.FC<{ children?: ReactNode }> = (props) => {
  const { children, ...genProps } = props;

  return (
    <h4 {...genProps} data-testid="h4-test">
      {children}
    </h4>
  );
};
export default H4;
