/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";
import { decryptedData } from "../utils/crypto";

export const initialAuthState = {
  accessToken: "",
  user: {
    id: "",
    email: "",
    username: "",
  },
};

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();

  const userDetails = cookies?.get("userDetails")
    ? decryptedData(cookies?.get("userDetails"))
    : initialAuthState;

  const [auth, setAuth] = useState(userDetails);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
