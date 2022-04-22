import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <Router>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  </React.StrictMode>
);
