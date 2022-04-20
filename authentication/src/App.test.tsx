import React from "react";
import { RecoilRoot } from "recoil";
import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App";

test("Test all the texts are present on screen", () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  expect(screen.getByText("PollApp")).toBeInTheDocument();
});
