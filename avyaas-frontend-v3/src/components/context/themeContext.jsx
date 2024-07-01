import React, { createContext, useContext, useEffect, useState } from "react";

export const themes = {
  dark: "dark",
  light: "light",
  white: "white",
};

export const ThemeContext = createContext({
  theme: localStorage.getItem("theme") ?? themes.light,
  changeTheme: () => {},
  viewNav: true,
  viewTab: true,
  changeView: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [view, setView] = useState({ viewNav: true, viewTab: true });

  const changeTheme = (theme) => {
    setTheme(theme);
  };

  const changeView = (viewNav, viewTab) => {
    setView({ viewNav: viewNav, viewTab: viewTab });
  };

  useEffect(() => {
    const element = document.getElementById("main");
    switch (theme) {
      case "light":
        element.classList.add("light");
        element.classList.remove("dark");
        break;
      case "dark":
        element.classList.add("dark");
        element.classList.remove("light");
        break;
      default:
        element.classList.add("light");
        element.classList.remove("dark");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        changeTheme: changeTheme,
        view: view,
        changeView: changeView,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
