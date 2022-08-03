import React, { KeyboardEvent, useContext, useEffect, useState } from "react";
import { EntriesContext } from "../../contexts/entriesContext";
import { TokenContext } from "../../contexts/tokenContext";
import { Entries } from "../../types/Entry";
import Day from "./Day";

type optionalDate = Date | null;
const WEEKS_TO_RENDER = 15;
const BUFFER_WEEKS = 5;
const MS_IN_WEEK_CONST = 7 * 24 * 60 * 60 * 1000;

export default function EntriesComponent(): JSX.Element {
  const { tokenData } = useContext(TokenContext);
  const { entries, dispatchEntries } = useContext(EntriesContext);
  const [updatedInterval, setUpdatedInterval] = useState<{
    start: optionalDate;
    end: optionalDate;
  }>({
    start: null,
    end: null,
  });
  const [currentWeek, setCurrentWeek] = useState(0);
  const [daysComponents, setDaysComponents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const startDate = new Date();
    let startDateToGet: optionalDate = null;
    let endDateToGet: optionalDate = null;

    if (!tokenData.token) {
      return;
    }

    for (let i = 0; i < (WEEKS_TO_RENDER + BUFFER_WEEKS) * 7; i++) {
      const currDate = new Date(startDate.getTime() - i * 24 * 60 * 60 * 1000);
      if (!(currDate.toDateString() in entries)) {
        if (endDateToGet === null) {
          endDateToGet = currDate;
        } else {
          startDateToGet = currDate;
        }
      }
    }

    if (startDateToGet === null && endDateToGet !== null) {
      startDateToGet = endDateToGet;
    }

    if (
      startDateToGet &&
      endDateToGet &&
      updatedInterval.start &&
      updatedInterval.end
    ) {
      if (
        startDateToGet >= getEarliestMSDate(updatedInterval.start) &&
        endDateToGet <= getLatestMSDate(updatedInterval.end)
      ) {
        return;
      }
    }
    if (startDateToGet !== null && endDateToGet !== null) {
      getEntries(
        dispatchEntries,
        startDateToGet,
        endDateToGet,
        tokenData.token,
        updatedInterval,
        setUpdatedInterval
      );
    }
  }, [currentWeek, entries, tokenData, updatedInterval, dispatchEntries]);

  useEffect(() => {
    setDaysComponents(
      getDaysComponents(
        entries,
        new Date(new Date().getTime() - currentWeek * MS_IN_WEEK_CONST)
      )
    );
  }, [entries, setDaysComponents, dispatchEntries, currentWeek]);

  return (
    <div
      tabIndex={0}
      className="grid grid-cols-7 mx-auto w-fit gap-0"
      onKeyDown={handleKeyPressCreator(currentWeek, setCurrentWeek)}
    >
      {daysComponents}
    </div>
  );
}

function getDaysComponents(entries: Entries, endDate: Date): JSX.Element[] {
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
}
function handleKeyPressCreator(
  currentWeek: number,
  setCurrentWeek: React.Dispatch<React.SetStateAction<number>>
) {
  return (event: KeyboardEvent) => {
    if (event.key === "j") {
      if (currentWeek > 0) {
        setCurrentWeek(currentWeek - 1);
      }
    } else if (event.key === "k") {
      setCurrentWeek(currentWeek + 1);
    }
  };
}
async function getEntries(
  dispatch: (action: any) => void,
  dateBegin: Date,
  dateEnd: Date,
  token: String,
  updatedInterval: { start: optionalDate; end: optionalDate },
  setUpdatedInterval: React.Dispatch<
    React.SetStateAction<{ start: optionalDate; end: optionalDate }>
  >
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
    if (updatedInterval.start === null || updatedInterval.end === null) {
      setUpdatedInterval({ start: dateBegin, end: dateEnd });
    } else {
      setUpdatedInterval({
        start:
          updatedInterval.start > dateBegin ? dateBegin : updatedInterval.start,
        end: updatedInterval.end < dateEnd ? dateEnd : updatedInterval.end,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function getLatestMSDate(date: Date): Date {
  let newDate = new Date(date.getTime());
  newDate.setHours(23);
  newDate.setMinutes(59);
  newDate.setSeconds(59);
  newDate.setMilliseconds(9999);
  return newDate;
}

function getEarliestMSDate(date: Date): Date {
  let newDate = new Date(date.getTime());
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
}
