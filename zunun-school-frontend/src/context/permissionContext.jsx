import React, { createContext, useContext, useState } from "react";
import { decryptedData } from "../utils/crypto";

export const initialPermissionState = {
  permissions: [
    { id: "", name: "", description: "", url: { id: "", path: "" } },
  ],
};

const PermissionContext = createContext({});

export const PermissionProvider = ({ children }) => {
  const userPermissions = localStorage.getItem("permissions")
    ? decryptedData(localStorage.getItem("permissions"))
    : initialPermissionState;

  const [permissions, setPermissions] = useState(userPermissions);

  return (
    <PermissionContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissionContext = () => useContext(PermissionContext);
