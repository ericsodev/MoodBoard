export const moods: { [key: string]: { desc: string; colour: string } } = {
  0: {
    desc: "go next please",
    colour: "bg-red-400 hover:bg-red-500 active:bg-red-600 text-red-900",
  },
  1: {
    desc: "ok i guess",
    colour:
      "bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-900",
  },
  2: {
    desc: "not bad",
    colour:
      "bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400 text-yellow-900",
  },
  3: {
    desc: "nice",
    colour: "bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-lime-900",
  },
  4: {
    desc: "funtastic",
    colour:
      "bg-green-400 hover:bg-green-500 active:bg-green-600 text-green-900",
  },
  default: {
    desc: "reset",
    colour:
      "bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-900",
  },
};
