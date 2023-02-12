import DarkModeCtrl from "@/components/dark-mode-ctrl/DarkModeCtrl";
import { H1 } from "@/components/UI/Headers";
import Toggle from "@/components/UI/Toggle/Toggle";

const Home = () => {
  return (
    <H1 className="text-3xl font-bold underline">
      Hello world!
      <DarkModeCtrl />
    </H1>
  );
};

export default Home;
