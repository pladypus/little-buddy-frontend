import { ComponentProps } from "react";
import DarkModeCtrl from "./dark-mode-ctrl/DarkModeCtrl";
import MainNav from "./MainNav";
import { H1 } from "./UI/Headers";

const Header: React.FC<{
  signOut?: ComponentProps<typeof MainNav>["signOut"];
  title: string;
}> = ({ signOut, title }) => {
  return (
    <header className="flex items-center justify-between pt-3 px-3">
      <MainNav signOut={signOut} />
      <H1 className="text-center">{title}</H1>
      <DarkModeCtrl />
    </header>
  );
};
export default Header;
