import Cookies from "js-cookie";
import { renewToken } from "../api/auth";
export default function reducer(state: any, action: any) {
  let newState = { token: "" };
  let tokenCookie;
  switch (action.type) {
    case "LOGOUT":
      newState.token = "";
      break;
    case "COOKIE":
      tokenCookie = Cookies.get("authToken");
      Cookies.remove("authToken");
      newState = { token: tokenCookie || state.token };
      break;
    case "RENEW":
      renewToken()
        .then((res) => {
          tokenCookie = Cookies.get("authToken");
          Cookies.remove("authToken");
          newState = { token: tokenCookie || state.token };
        })
        .catch((err) => {
          newState.token = state.token;
        });
      break;
    case "REFRESH":
      tokenCookie = Cookies.get("authToken");
      Cookies.remove("authToken");
      newState = { token: tokenCookie || state.token };
      break;
    default:
      newState.token = state.token;
      console.log("run");
  }
  console.log(newState);
  return newState;
}
