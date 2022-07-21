import React from "react";

interface ITokenContext {
  tokenData: { token: string | null };
  dispatchToken: React.Dispatch<any>;
}

const defaultState: ITokenContext = {
  tokenData: { token: null },
  dispatchToken: () => null,
};

export const TokenContext = React.createContext<ITokenContext>(defaultState);
