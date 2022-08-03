import React, { useContext } from "react";
import { deleteEntry, submitEntry } from "../../api/entries";
import { moods } from "../../constants";
import { EntriesContext } from "../../contexts/entriesContext";
import { SelectedDayContext } from "../../contexts/selectedDayContext";
import { TokenContext } from "../../contexts/tokenContext";
import Tooltip from "./Tooltip";
const OPTIONS: { [key: string]: { desc: string; colour: string } } = {
  0: {
    ...moods[0],
  },
  1: {
    ...moods[1],
  },
  2: {
    ...moods[2],
  },
  3: {
    ...moods[3],
  },
  4: {
    ...moods[4],
  },
  default: {
    ...moods.default,
  },
  submit: {
    desc: "lock in",
    colour:
      "bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-slate-100",
  },
};
export default function Selector(): JSX.Element {
  const { selectedDay } = useContext(SelectedDayContext);
  const { dispatchEntries } = useContext(EntriesContext);
  const { tokenData } = useContext(TokenContext);

  return (
    <div className="flex flex-row mx-auto pt-3 pb-3 bg-slate-600 rounded-b-md">
      {Array.from(Object.keys(OPTIONS), (key) => (
        <div
          key={key}
          onClick={getOnClickFunction(
            key,
            selectedDay.date,
            dispatchEntries,
            tokenData.token || ""
          )}
          className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 group relative ${OPTIONS[key].colour}`}
        >
          <Tooltip
            text={OPTIONS[key].desc}
            colour={OPTIONS[key].colour}
          ></Tooltip>
        </div>
      ))}
    </div>
  );
}

function getOnClickFunction(
  key: string,
  date: Date,
  dispatchEntries: React.Dispatch<any>,
  token: string
) {
  if (key === "submit") {
    return () => {};
  } else if (key === "default") {
    return async () => {
      if (await deleteEntry(date, token)) {
        dispatchEntries({
          type: "REMOVE_FROM_ARRAY",
          payload: [date],
        });
      }
    };
  } else {
    return async () => {
      const entry = await submitEntry(
        { date: date.toDateString(), mood: Number(key) },
        token
      );
      if (entry) {
        dispatchEntries({
          type: "UPDATE_FROM_ARRAY",
          payload: [entry],
        });
      }
    };
  }
}
