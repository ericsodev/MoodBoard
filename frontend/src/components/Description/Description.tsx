import { useContext } from "react";
import { SelectedDayContext } from "../../contexts/selectedDayContext";
import { moods } from "../../constants";

export function Description(): JSX.Element {
  const { selectedDay } = useContext(SelectedDayContext);
  return (
    <div className="w-70 md:w-84 lg:w-112 py-2 lg:py-4 px-3 lg:px-6 rounded-t-md mx-auto bg-slate-600">
      <span className="inline-block w-16c text-white font-semibold text-sm md:text-md">
        {selectedDay.date.toDateString()}
      </span>{" "}
      <span
        className={`mx-4 py-1 px-2 text-sm md:text-md rounded-sm font-medium ${
          selectedDay.mood in moods
            ? moods[selectedDay.mood].colour
            : moods.default.colour
        }`}
      >
        {selectedDay.mood in moods
          ? moods[selectedDay.mood].desc
          : "such empty"}
      </span>
    </div>
  );
}
