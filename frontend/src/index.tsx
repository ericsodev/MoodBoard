import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/inter.css";
import "./fonts/metropolis.css";
import App from "./App";
// import "dotenv/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App></App>);
