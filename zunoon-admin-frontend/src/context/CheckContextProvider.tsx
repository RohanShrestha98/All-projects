import React, { createContext, useContext, useState } from "react";

type CheckContextType = {
  checkedValues: string[];
  setCheckedValues: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CheckContext = createContext<CheckContextType | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

export const CheckContextProvider: React.FC<Props> = ({ children }) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const contextValue: CheckContextType = {
    checkedValues,
    setCheckedValues,
  };

  return <CheckContext.Provider value={contextValue}>{children}</CheckContext.Provider>;
};

export const useCheckContext = () => {
  const context = useContext(CheckContext);
  if (!context) {
    throw new Error("useCheckContext must be used within a CheckContextProvider");
  }
  return context;
};
