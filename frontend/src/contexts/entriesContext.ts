import React from "react";
import { Entries } from "../types/Entry";

interface IEntriesContext {
  entries: Entries;
  dispatchEntries: React.Dispatch<Entries>;
}

export const EntriesContext = React.createContext<IEntriesContext>({
  entries: {},
  dispatchEntries: (value: any) => {},
});
