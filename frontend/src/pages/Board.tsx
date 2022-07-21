import { TokenContext } from "../contexts/tokenContext";
import { useContext, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import Entries from "../components/Entries/Entries";
import {
  SelectedDayContext,
  ISelectedDay,
} from "../contexts/selectedDayContext";
import Description from "../components/Description";
import Selector from "../components/Selector";
import { EntriesContext } from "../contexts/entriesContext";
import entryReducer from "../reducers/entryReducer";

export default function Dashboard(): JSX.Element {
  const { tokenData } = useContext(TokenContext);
  const [entries, dispatchEntries] = useReducer(entryReducer, {});
  const [selectedDay, setSelectedDay] = useState<ISelectedDay>({
    date: new Date(),
    mood: -1,
  });

  if (tokenData.token) {
    return (
      <EntriesContext.Provider
        value={{ entries: entries, dispatchEntries: dispatchEntries }}
      >
        <SelectedDayContext.Provider
          value={{ selectedDay: selectedDay, setSelectedDay: setSelectedDay }}
        >
          <div className="flex flex-row flex-grow content-center justify-center">
            <div className="flex flex-col content-center min-w-fit">
              <Description></Description>
              <Entries></Entries>
              <Selector></Selector>
            </div>
          </div>
        </SelectedDayContext.Provider>
      </EntriesContext.Provider>
    );
  } else {
    return (
      <div className="">
        <Link to={"/login"}>Login Here</Link>
      </div>
    );
  }
}
