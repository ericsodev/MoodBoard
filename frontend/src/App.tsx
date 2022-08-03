import tokenReducer from "./reducers/tokenReducer";
import { useEffect, useReducer, useState } from "react";
import { TokenContext } from "./contexts/tokenContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Board";
import { renewToken } from "./api/auth";
import { UserContext } from "./contexts/userContext";

function App() {
  const [tokenData, dispatchToken] = useReducer(tokenReducer, { token: "" });
  const [userInfo, setUserInfo] = useState({ nickname: "" });

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    renewToken()
      .then(() => {
        dispatchToken({ type: "REFRESH" });
      })
      .catch((err) => {
        dispatchToken({ type: "LOGOUT" });
        setUserInfo({ nickname: "" });
        console.log(err);
      });
  }, [dispatchToken]);
  useEffect(() => {
    if (tokenData.token) {
      fetch("/user", {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          setUserInfo({ nickname: data.nickname || "___" });
        })
        .catch((err) => console.log("Error retrieving User info"));
    }
  }, [tokenData]);
  return (
    <Router>
      <div className="bg-zinc-50 h-screen">
        <nav className="bg-slate-300 ">
          <ul className="list-none mx-auto block p-3 w-fit text-slate-700 font-medium">
            <li className="inline-block mx-8 active:font-medium">
              <NavLink
                to="/login"
                className={(data) =>
                  data.isActive ? "text-slate-800 font-semibold" : ""
                }
              >
                {tokenData.token ? "Account" : "Login"}
              </NavLink>
            </li>
            {tokenData.token ? (
              <li className="inline-block mx-8">
                <NavLink
                  to="/dashboard"
                  className={(data) =>
                    data.isActive ? "text-slate-800 font-semibold" : ""
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <div className="px-16 py-8">
          <TokenContext.Provider
            value={{
              tokenData: tokenData || { token: "bwoken" },
              dispatchToken: dispatchToken,
            }}
          >
            <UserContext.Provider value={userInfo}>
              <Routes>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route
                  path="/dashboard"
                  element={<Dashboard></Dashboard>}
                ></Route>
                <Route
                  path="/"
                  element={
                    tokenData.token ? <Dashboard></Dashboard> : <Login></Login>
                  }
                ></Route>
              </Routes>
            </UserContext.Provider>
          </TokenContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
