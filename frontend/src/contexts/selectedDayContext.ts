import React from "react";

export interface ISelectedDay {
  date: Date;
  mood: number;
}

interface ISelectedDayContext {
  selectedDay: ISelectedDay;
  setSelectedDay: React.Dispatch<React.SetStateAction<ISelectedDay>>;
}

const defaultValue = {
  selectedDay: {
    date: new Date(),
    mood: -1,
  },
  setSelectedDay: (newState: any) => {},
};

export const SelectedDayContext =
  React.createContext<ISelectedDayContext>(defaultValue);
