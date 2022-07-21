import { useContext, useEffect, useReducer, useState } from "react";
import { EntriesContext } from "../../contexts/entriesContext";
import { TokenContext } from "../../contexts/tokenContext";
import { Entries } from "../../types/Entry";
import Day from "./Day";

export default function EntriesComponent(): JSX.Element {
  const { tokenData } = useContext(TokenContext);
  const { entries, dispatchEntries } = useContext(EntriesContext);
  const [daysComponents, setDaysComponents] = useState<JSX.Element[]>([]);
  const WEEKS_TO_RENDER = 15;

  const getDaysComponents = (
    entries: Entries,
    endDate: Date
  ): JSX.Element[] => {
    let components: JSX.Element[] = [];

    for (let i = WEEKS_TO_RENDER * 7 - 1; i >= 0; i--) {
      let currDate = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
      let currDateStr = currDate.toDateString();

      components.push(
        <Day
          mood={currDateStr in entries ? entries[currDateStr] : -1}
          date={currDate}
          key={i + 1}
        ></Day>
      );
    }

    return components;
  };
  useEffect(() => {
    if (tokenData.token) {
      getEntries(
        dispatchEntries,
        new Date(
          new Date().getTime() - WEEKS_TO_RENDER * 7 * 24 * 60 * 60 * 1000
        ),
        new Date(),
        tokenData.token
      );
    }
  }, [tokenData, dispatchEntries]);

  useEffect(() => {
    console.log(entries);
    setDaysComponents(getDaysComponents(entries, new Date()));
  }, [entries, setDaysComponents, dispatchEntries]);

  return (
    <div className="grid grid-cols-7 mx-auto w-fit gap-0">{daysComponents}</div>
  );
}

async function getEntries(
  dispatch: (action: any) => void,
  dateBegin: Date,
  dateEnd: Date,
  token: String
) {
  try {
    const res = await fetch(
      "http://localhost:5000/api/entries?" +
        new URLSearchParams({
          start: dateBegin.getTime().toString(),
          end: dateEnd.getTime().toString(),
        }),
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    dispatch({ type: "UPDATE_FROM_ARRAY", payload: data });
  } catch (e) {
    console.log(e);
  }
}
