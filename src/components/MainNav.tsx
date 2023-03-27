import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Button from "./UI/Button";
import { Offcanvas } from "./UI/offcanvas";

type navOpt = {
  pathName: string;
  displayName: string;
  testId: `${string}-link`;
};

const navPaths: navOpt[] = [
  {
    pathName: "/ae106f98-de7e-46f5-bd46-c4f191875a7d",
    displayName: "My Dogs",
    testId: "dog-link",
  },
  // { pathName: "/[dogId]", displayName: "My Dogs" },
  { pathName: "/my-family", displayName: "My Family", testId: "family-link" },
  { pathName: "/find-breed", displayName: "Find Breed", testId: "breed-link" },
];

const MainNav: React.FC<{ signOut?: (data?: any) => void }> = ({ signOut }) => {
  const [showNav, setShowNav] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);

  const navLinks = navPaths.map((opt) => {
    return (
      <Link
        href={opt.pathName}
        key={Math.random()}
        className="p-2 capitalize text-center font-medium hover:underline"
        onClick={closeNav}
        data-testid={opt.testId}
      >
        {opt.displayName}
      </Link>
    );
  });

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        size="3x"
        onClick={openNav}
        data-testid="menu-btn"
        // onClick={() => props.signOut?.()}
      />
      <Offcanvas show={showNav} onClose={closeNav}>
        <nav className="flex flex-col h-full" data-testid="menu-nav">
          <div className="flex-grow flex flex-col">{navLinks}</div>
          <Button
            onClick={() => signOut?.()}
            className="p-2"
            data-testid="sign-out-btn"
          >
            Sign Out
          </Button>
        </nav>
      </Offcanvas>
    </>
  );
};
export default MainNav;
