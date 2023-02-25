import { ReactNode } from "react";

const Drawer: React.FC<{ children?: ReactNode }> = (props) => {
  return <div data-testid="drawer-test">{props.children}</div>;
};
export default Drawer;
