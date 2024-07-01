import { create } from "zustand";
import Cookies from "universal-cookie";
import { decryptedData, encryptData } from "../utils/crypto";
const cookies = new Cookies();

const moduleStore = (set) => ({
  userModules: decryptedData(cookies.get("userModules")) ?? null,
  currentModule: decryptedData(cookies.get("currentModule")) ?? null,

  setCurrentModule: (selectedModule) => {
    set(() => {
      cookies.set("currentModule", encryptData(selectedModule));
      return { currentModule: selectedModule };
    });
  },
  setUserModules: (userModules) => {
    set(() => {
      cookies.set("userModules", encryptData(userModules));
      return { userModules: userModules };
    });
  },
});

export const useModuleStore = create(moduleStore);
