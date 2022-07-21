import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";

export default function Login(): JSX.Element {
  const { tokenData } = useContext(TokenContext);
  const { nickname } = useContext(UserContext);

  if (tokenData.token) {
    return <div>Logged in as {nickname}</div>;
  } else {
    return (
      <div className="">
        <a
          className="bg-gray-200 py-3 px-6 rounded-lg hover:bg-gray-300 text-slate-900 font-medium duration-150 ease-in-out"
          href="http://localhost:5000/auth/github"
        >
          Login with Github
        </a>
      </div>
    );
  }
}
