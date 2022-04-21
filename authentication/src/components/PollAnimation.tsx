import { animated, config, useTransition } from "@react-spring/web";
import React from "react";
import styled from "styled-components";
import { useWindowSize } from "../hooks/WindowSize";
import data from "../animatedData";

const PollAnimation = () => {
  const windowSize = useWindowSize();
  const transitionWidth = useTransition(data, {
    config: config.molasses,
    from: { width: 0 },
    leave: { width: 200 },
    enter: { width: 200 },
    trail: 300,
  });

  const transitionHeight = useTransition(data, {
    config: config.molasses,
    from: { height: 0 },
    leave: { height: 200 },
    enter: { height: 200 },
    trail: 300,
  });

  return (
    <AnimatedPoll>
      {windowSize === "large"
        ? transitionWidth(({ width }, item) => {
            return (
              <animated.div
                style={{
                  width: width.to({
                    range: [0, 200],
                    output: [0, item.width],
                  }),
                  height: "80px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  backgroundColor: item.color,
                  opacity: 0.7,
                  margin: "20px 0",
                }}
              >
                <PollBar />
              </animated.div>
            );
          })
        : transitionHeight(({ height }, item) => {
            return (
              <animated.div
                style={{
                  height: height.to({
                    range: [0, 200],
                    output: [0, item.width],
                  }),
                  width: "80px",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                  backgroundColor: item.color,
                  opacity: 0.7,
                  margin: "0 10px",
                }}
              >
                <PollBar />
              </animated.div>
            );
          })}
    </AnimatedPoll>
  );
};

const AnimatedPoll = styled((props) => {
  return <div {...props} />;
})`
  position: absolute;
  left: 0;
  @media (max-width: 1020px) {
    display: flex;
    align-items: end;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const PollBar = styled((props) => {
  return <div {...props} />;
})`
  height: 80px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
`;

export default PollAnimation;
