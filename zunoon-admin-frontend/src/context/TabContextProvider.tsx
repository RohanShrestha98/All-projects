import React, { createContext, useContext, useState } from "react";

type TabContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

export const TabContextProvider: React.FC<Props> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("grade_category");

  const contextValue: TabContextType = {
    activeTab,
    setActiveTab,
  };

  return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabContextProvider");
  }
  return context;
};
