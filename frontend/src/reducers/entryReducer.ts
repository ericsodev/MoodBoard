import { Entries, Entry } from "../types/Entry";

export default function reducer(state: any, action: any) {
  let newState: Entries = {};
  switch (action.type) {
    case "SET_FROM_ARRAY":
      newState = {};
      for (let i = 0; i < action.payload.length; i++) {
        let entry: Entry = action.payload[i];
        newState[new Date(entry.date).toDateString()] = entry.mood;
      }
      break;
    case "UPDATE_FROM_ARRAY":
      newState = shallowCopyState(state);
      for (let i = 0; i < action.payload.length; i++) {
        let entry: Entry = action.payload[i];
        newState[new Date(entry.date).toDateString()] = entry.mood;
      }
      break;
    case "REMOVE_FROM_ARRAY":
      newState = shallowCopyState(state);
      for (let i = 0; i < action.payload.length; i++) {
        let date: Date = action.payload[i];
        delete newState[date.toDateString()];
      }
      break;
    default:
      break;
  }
  return newState;
}

function shallowCopyState(oldState: Entries): Entries {
  let copy: Entries = {};

  for (let date in oldState) {
    copy[date] = oldState[date];
  }
  return copy;
}
