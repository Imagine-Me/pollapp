import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
