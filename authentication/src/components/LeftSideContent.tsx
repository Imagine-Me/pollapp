import { Typography } from "antd";
import React from "react";
import { LeftSideUserContent } from "./LeftSideContainer";
const { Title } = Typography;

interface Props {
  children: React.ReactNode;
}

const LeftSideContent = ({ children }: Props) => {
  return (
    <div style={{ zIndex: 10 }}>
      <Typography className="title-left">
        <Title>PollApp</Title>
        <Title level={5}>Create your own polls.</Title>
      </Typography>
      <LeftSideUserContent>{children}</LeftSideUserContent>
    </div>
  );
};

export default LeftSideContent;
