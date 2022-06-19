import React from "react";
import styled, { keyframes } from "styled-components";

const anim1 = (height: number) => keyframes`
  from{
    height: 0;
  }
  to {
    height: ${height}%;
  }
`;
const anim2 = (width: number) => keyframes`
  from{
    width: 0;
  }
  to {
    width: ${width}%;
  }
`;

const AnimatedPoll = styled((props) => {
  return <div {...props} />;
})`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: end;
  > div.first {
    background-color: rgb(66, 135, 245);
  }
  > div.second {
    background-color: rgb(245, 96, 66);
  }
  > div.third {
    background-color: rgb(245, 66, 218);
  }
  > div.fourth {
    background-color: rgb(66, 245, 117);
  }
  @media (min-width: 1019px) {
    flex-flow: column;
    align-items: start;
    height: 340px;
    width: 500px;
    > div {
      height: 20%;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    > div.first {
      animation: ${anim2(40)} 1.3s forwards;
    }
    > div.second {
      animation: ${anim2(90)} 1.8s forwards;
      animation-delay: 1s;
    }
    > div.third {
      animation: ${anim2(20)} 0.8s forwards;
      animation-delay: 2.5s;
    }
    > div.fourth {
      animation: ${anim2(60)} 1.5s forwards;
      animation-delay: 3s;
    }
  }
  @media (max-width: 1020px) {
    height: 500px;
    width: 300px;
    max-width: 300px;
    > div {
      width: 20%;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    > div.first {
      animation: ${anim1(40)} 1.3s forwards;
    }
    > div.second {
      animation: ${anim1(90)} 1.8s forwards;
      animation-delay: 1s;
    }
    > div.third {
      animation: ${anim1(20)} 0.8s forwards;
      animation-delay: 2.5s;
    }
    > div.fourth {
      animation: ${anim1(60)} 1.5s forwards;
      animation-delay: 3s;
    }
  }
`;

const Container = styled((props) => <div {...props} />)`
  position: absolute;
  @media (min-width: 1019px) {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 1020px) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PollAnimation = () => {
  return (
    <Container>
      <AnimatedPoll>
        <div className="first"></div>
        <div className="second"></div>
        <div className="third"></div>
        <div className="fourth"></div>
      </AnimatedPoll>
    </Container>
  );
};

export default PollAnimation;
