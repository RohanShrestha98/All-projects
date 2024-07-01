// ColorContext.js
import { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("white");
  const [background, setBackground] = useState("gray");

  return (
    <ColorContext.Provider
      value={{ color, setColor, background, setBackground }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  return useContext(ColorContext);
};
