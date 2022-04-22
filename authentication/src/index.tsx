import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Router>
);
