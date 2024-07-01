import React, { createContext, useContext, useState } from "react";
import { IUser, UserContextType } from "../@types/userContext";

export const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = {
  children?: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>({
    id: "",
    image: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    role: [],
  });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
