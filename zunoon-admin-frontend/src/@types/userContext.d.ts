import React from "react";

interface IPermission {
  id: number;
  name: string;
}
export interface IUser {
  id: string;
  image: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  role: any;
}

export type UserContextType = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
};
