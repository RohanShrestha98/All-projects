import { useCallback } from "react";
import { useThemeContext } from "../components/context/themeContext";

const useChangeLayout = (width, viewNav, viewTab) => {
  const { changeView, changeTheme } = useThemeContext();
  const changeLayout = useCallback(
    (width, viewNav, viewTab, color) => {
      if (width > 480) {
        changeView(true, true);
        changeTheme("light");
      } else {
        changeView(viewNav, viewTab);
        changeTheme(color);
      }
    },
    [viewNav, viewTab]
  );
  return { changeLayout };
};

export default useChangeLayout;
