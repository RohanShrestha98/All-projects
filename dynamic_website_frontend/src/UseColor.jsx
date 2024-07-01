import { createContext, useContext } from "react";

export const useColor = () => {
  return useContext(ColorContext);
};
