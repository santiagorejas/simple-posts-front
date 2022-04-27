import { useState } from "react";
import ThemeContext from "./theme-context";

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("dark");

  const toggleThemeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
