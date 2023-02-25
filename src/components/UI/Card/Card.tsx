import { ReactNode } from "react";

const Card: React.FC<{ children?: ReactNode }> = (props) => {
  return <div data-testid="card-test">{props.children}</div>;
};
export default Card;
