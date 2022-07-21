interface ITooltip {
  text: string;
  colour: string;
}
export default function Tooltip({ text, colour }: ITooltip): JSX.Element {
  return (
    <div
      className={`group-hover:scale-100 absolute left-1/2 -translate-x-1/2 z-50 group-hover:translate-y-12 duration-100 scale-0 bottom-0 w-fit whitespace-nowrap rounded-md py-1 px-2 ${colour}`}
    >
      {text}
    </div>
  );
}
