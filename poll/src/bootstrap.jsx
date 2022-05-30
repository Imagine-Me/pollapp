import { createRoot } from "react-dom/client";
import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import Wrapper from "./App";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <Router>
      <RecoilRoot>
        <Wrapper />
      </RecoilRoot>
    </Router>
  </React.StrictMode>
);
