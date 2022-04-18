import * as React from "react";
import { GoogleLogin } from "react-google-login";
import "./App.css";
import { useRecoilState } from "recoil";
import { userState } from "./recoil/atom/user";
import styled from "styled-components";
import { Typography } from "antd";
import { useSpring, animated, config, useTransition } from "@react-spring/web";
import data from "./animatedData";
import Item from "antd/lib/list/Item";
const { Title, Paragraph } = Typography;

const HomePageStyled = styled((props) => {
  return <div {...props} />;
})`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const AnimatedPoll = styled((props) => {
  return <div {...props} />;
})`
  position: absolute;
  margin-top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

const Bar = styled((props) => {
  return <div {...props} />;
})`
  height: 80px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
`;

const LeftSideStyled = styled((props) => {
  return <div {...props} />;
})`
  width: 70%;
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
  article {
    padding: 50px;
    text-align: right;
    & h1 {
      color: white;
      font-size: 52px;
    }
    & h5 {
      color: white;
      font-size: 22px;
    }
  }
`;
const RightSideStyled = styled((props) => {
  return <div {...props} />;
})`
  width: 65%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleLoginStyled = styled((props) => {
  return <GoogleLogin {...props} />;
})`
  width: 120px;
`;

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const props = useSpring({
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
  const transition = useTransition(data, {
    config: config.molasses,
    from: { width: 0 },
    leave: { width: 200 },
    enter: { width: 200 },
    trail: 300,
  });
  const responseGoogle = (response: any) => {
    console.log(response);

    const { name, tokenId, email, imageUrl } = response.profileObj;
    setUser({
      name,
      isLoggedIn: true,
      userImage: imageUrl,
      email,
      isLoading: false,
    });
  };

  return (
    <HomePageStyled>
      <LeftSideStyled>
        <AnimatedPoll>
          {transition(({ width }, item) => {
            return (
              <animated.div
                style={{
                  width: width.to({ range: [0, 200], output: [0, item.width] }),
                  height: "80px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  backgroundColor: item.color,
                  opacity: 0.6,
                  margin: "20px 0",
                }}
              >
                <Bar />
              </animated.div>
            );
          })}
        </AnimatedPoll>
        <animated.div style={{ ...props, zIndex: 2 }}>
          <Typography>
            <Title>PollApp</Title>
            <Title level={5}>Create your own polls.</Title>
          </Typography>
        </animated.div>
      </LeftSideStyled>
      <RightSideStyled>
        <GoogleLoginStyled
          clientId={process.env.GOOGLE_CLIENT_ID ?? ""}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn
        />
      </RightSideStyled>
    </HomePageStyled>
  );
};
export default App;
