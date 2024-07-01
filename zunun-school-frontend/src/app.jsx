import React from "react";
import { useEffect } from "react";
import { ThemeContext } from "./context/themeContext";
import { useState } from "react";
import RoutesHandler from "./routes/routeHandler";
import ScrollToTop from "./utils/scrollToTop";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [view, setView] = useState({ viewNav: true, viewTab: true });

  function changeTheme(theme) {
    setTheme(theme);
  }

  function changeView(viewNav, viewTab) {
    setView({ viewNav: viewNav, viewTab: viewTab });
  }

  useEffect(() => {
    let element = document.getElementById("main");
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
      }}
    >
      <div
        id="main"
        className={`${
          theme === "white" ? "bg-white" : "bg-gray-bg"
        } font-Urbanist sticky overflow-auto top-0 h-screen`}
      >
        <div className="dark:bg-black-gray">
          <ScrollToTop />
          <RoutesHandler />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
