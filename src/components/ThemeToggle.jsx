import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="mr-2 p-2 flex items-center justify-center rounded-md cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {theme === "light" ? (
        <MdDarkMode />
      ) : (
        <MdOutlineLightMode className="font-bold" />
      )}
    </button>
  );
};

export default ThemeToggle;
