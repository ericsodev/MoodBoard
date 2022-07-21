import React from "react";

interface IUser {
  nickname: string;
}

export const UserContext = React.createContext<IUser>({ nickname: "" });
