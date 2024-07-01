import { createContext } from "react";

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
