import { create } from "zustand";
import Cookies from "universal-cookie";
import { decryptedData, encryptData } from "../utils/crypto";
const cookies = new Cookies();

const authStore = (set) => ({
  user: decryptedData(cookies.get("user")) || null,
  loggedIn: decryptedData(cookies.get("user"))?.access ? true : false,

  setUser: (user) => {
    set(() => {
      cookies.set("user", encryptData(user));
      return { user: user };
    });
  },

  phone: decryptedData(cookies.get("phone")) || null,
  setPhone: (phone) => {
    set(() => {
      cookies.set("phone", encryptData(phone));
      return { phone: phone };
    });
  },

  login: (user) => {
    set(() => {
      cookies.set("user", encryptData(user));
      return {
        loggedIn: true,
        user: user,
      };
    });
  },

  logout: () =>
    set(() => {
      cookies.remove("user");
      cookies.remove("currentModule");
      cookies.remove("userModules");
      return {
        loggedIn: false,
        user: null,
      };
    }),
});

export const useAuthStore = create(authStore);
