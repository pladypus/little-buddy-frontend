import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useEffect, useState } from "react";

const DarkModeCtrl = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const inDarkMode =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(inDarkMode);
  }, []);

  const changeMode: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setDarkMode(event.target.checked);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={changeMode}
        checked={darkMode}
        data-testid="darkCtrl-test"
      />
      {darkMode ? (
        <FontAwesomeIcon icon={faMoon} className="text-lg" title="Dark Mode" />
      ) : (
        <FontAwesomeIcon icon={faSun} className="text-lg" title="Light Mode" />
      )}
    </label>
  );
};
export default DarkModeCtrl;
