import { useCallback, useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

const useChangeLayout = (width, viewNav, viewTab) => {
  const layout = useContext(ThemeContext);
  const changeLayout = useCallback(
    (width, viewNav, viewTab, color) => {
      if (width > 480) {
        layout.changeView(true, true);
        layout.changeTheme("light");
      } else {
        layout.changeView(viewNav, viewTab);
        layout.changeTheme(color);
      }
    },
    [viewNav, viewTab],
  );
  return { changeLayout };
};

export default useChangeLayout;
