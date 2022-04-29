import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = document.getElementById("root");

createRoot(root).render(
    <Router>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
);
