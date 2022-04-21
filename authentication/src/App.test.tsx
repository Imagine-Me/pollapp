import React from "react";
import { RecoilRoot } from "recoil";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("react-google-login", () => {
  return {
    GoogleLogin: (props: any) => {
      const onClick = () => {
        props.onSuccess({
          profileObj: {
            tokenId: "idds",
            name: "John",
          },
        });
      };
      return <button onClick={onClick} data-testid="google-button" />;
    },
  };
});

test("Test all the texts are present on screen", () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  expect(screen.getByText("PollApp")).toBeInTheDocument();
  expect(screen.getByText("Create your own polls.")).toBeInTheDocument();
  expect(
    screen.getByText("Login to create your own poll.")
  ).toBeInTheDocument();
});

test("Test sign in works", () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  expect(
    screen.getByText("Login to create your own poll.")
  ).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("google-button"));
  expect(
    screen.getByText("Hi John, go to profile to create poll")
  ).toBeInTheDocument();
});
