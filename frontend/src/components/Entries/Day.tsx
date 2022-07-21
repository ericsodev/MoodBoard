import { useContext } from "react";
import { SelectedDayContext } from "../../contexts/selectedDayContext";
import { moods as COLOURS } from "../../constants";

interface IDay {
  date: Date;
  mood: number;
}
export default function Day({ date, mood }: IDay): JSX.Element {
  const { selectedDay, setSelectedDay } = useContext(SelectedDayContext);
  let colour = COLOURS[mood]?.colour || COLOURS.default.colour;
  let border =
    date.toDateString() === new Date().toDateString() ? "brightness-75" : "";
  return (
    <div
      onClick={() => {
        setSelectedDay({ date: date, mood: mood });
      }}
      className={`w-10 h-10 md:w-12 md:h-16 lg:w-16 lg:h-16 font-sans ${colour} ${border} cursor-pointer transition-all duration-50 ease-out ${
        selectedDay.date === date && selectedDay.mood === -1
          ? "bg-slate-400 hover:bg-slate-400 active:bg-slate-500"
          : ""
      }`}
    ></div>
  );
}
