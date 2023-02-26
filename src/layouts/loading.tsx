import { ReactNode } from "react";
import Spinner from "~/components/UI/Spinner";

const LoadingLayout: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <main className="flex-grow flex justify-center items-center">
      <Spinner />
      {props.children}
    </main>
  );
};

export default LoadingLayout;
