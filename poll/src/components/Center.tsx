import React from "react";
import styled from "styled-components";

const CenterComponent = styled((props) => {
  return <div {...props} />;
})`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CenterComponent;
