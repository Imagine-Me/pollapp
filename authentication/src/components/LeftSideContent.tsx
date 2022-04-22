import { animated, useSpring } from "@react-spring/web";
import { Typography } from "antd";
import React from "react";
import { LeftSideUserContent } from "./LeftSideContainer";
const { Title } = Typography;

interface Props {
  children: React.ReactNode;
}

const LeftSideContent = ({ children }: Props) => {
  const opacityAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 2000,
    },
  });
  return (
    <animated.div style={{ ...opacityAnimation }}>
      <Typography className="title-left">
        <Title>PollApp</Title>
        <Title level={5}>Create your own polls.</Title>
      </Typography>
      <LeftSideUserContent>{children}</LeftSideUserContent>
    </animated.div>
  );
};

export default LeftSideContent
