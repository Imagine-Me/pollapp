import React from "react";
import styled, { keyframes } from "styled-components";
import { Typography, Spin } from "antd";

const { Title } = Typography;

const fadeInOut = keyframes`
0% {
    opacity: 1;
}
50%{
    opacity: 0;
}
100%{
    opacity: 1;
}
`;

const Loading = styled((props) => {
  return (
    <div {...props}>
      <Spin />
      <Title level={2}>Loading</Title>
    </div>
  );
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  > h2 {
    margin-left: 10px;
    margin-bottom: 0 !important;
    animation: ${fadeInOut} 2s infinite;
  }
  .ant-spin {
    margin-top: 10px;
  }
`;

export default Loading;
