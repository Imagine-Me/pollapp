import { Typography } from "antd";
import React from "react";
import styled, { keyframes } from "styled-components";
import { LeftSideUserContent } from "./LeftSideContainer";
const { Title } = Typography;

interface Props {
  children: React.ReactNode;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled((props) => <div {...props} />)`
  z-index: 10;
  animation: ${fadeIn} 1s ease-in;
`;

const LeftSideContent = ({ children }: Props) => {
  return (
    <Container>
      <Typography className="title-left">
        <Title>PollApp</Title>
        <Title level={5}>Create your own polls.</Title>
      </Typography>
      <LeftSideUserContent>{children}</LeftSideUserContent>
    </Container>
  );
};

export default LeftSideContent;
