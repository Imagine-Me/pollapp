import React from "react";
import styled from "styled-components";

const LeftSideContainer = styled((props) => {
  return <div {...props} />;
})`
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: #526685;
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    right: -100px;
    height: 100%;
    background-color: #526685;
    width: 100px;
    clip-path: polygon(0 0, 0 100%, 100% 0, 100% 0);
  }
  .title-left {
    padding: 50px;
    text-align: right;
    & h1 {
      color: white;
      font-size: 52px;
    }
    & h5 {
      color: white;
    }
  }
  @media (max-width: 1020px) {
    width: 100%;
    justify-content: start;
    align-items: flex-start;
    .title-left {
      text-align: left;
      padding: 30px;
    }
    &::after {
      content: none;
    }
  }
`;

export const LeftSideUserContent = styled((props) => {
    return <div {...props} />;
  })`
    display: none;
    padding: 30px;
    @media (max-width: 1020px) {
      display: block;
      & h3 {
        color: white;
      }
    }
  `;
export default LeftSideContainer;
