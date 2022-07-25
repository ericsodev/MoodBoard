import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";

export default function Login(): JSX.Element {
  const { tokenData, dispatchToken } = useContext(TokenContext);
  const { nickname } = useContext(UserContext);

  if (tokenData.token) {
    return (
      <div className="flex flex-col content-start items-start gap-3">
        Logged in as {nickname}{" "}
        <button className="bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 text-slate-900 duration-150 ease-in-out inline-block">
          change nickname
        </button>
        <button
          onClick={() => {
            if (!tokenData.token) {
              return;
            }
            logout(tokenData.token)
              .then(() => {
                dispatchToken({ type: "LOGOUT" });
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 text-slate-900 duration-150 ease-in-out inline-block"
        >
          logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="">
        <a
          className="bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 text-slate-900 font-medium duration-150 ease-in-out"
          href="http://localhost:5000/auth/github"
        >
          Login with Github
        </a>
      </div>
    );
  }
}

async function logout(token: String): Promise<void> {
  try {
    console.log(1);
    await fetch("http://localhost:5000/auth/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log(err);
  }
}
