import { ReactNode } from "react";

const H5: React.FC<{ children?: ReactNode }> = (props) => {
  const { children, ...genProps } = props;

  return (
    <h5 {...genProps} data-testid="h5-test">
      {children}
    </h5>
  );
};
export default H5;
