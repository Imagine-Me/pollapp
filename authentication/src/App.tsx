import * as React from "react";
import "./App.css";
import { useRecoilState } from "recoil";
import { Typography } from "antd";
import { useSpring, animated } from "@react-spring/web";
import { userState } from "./recoil/atom/user";
import HomePageWrapper from "./components/HomePageWrapper";
import PollAnimation from "./components/PollAnimation";
import LeftSideContainer, {
  LeftSideUserContent,
} from "./components/LeftSideContainer";
import RightSideContainer, {
  RightSideContent,
} from "./components/RightSideContainer";

const { Title } = Typography;

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

  const responseGoogle = (response: any) => {
    const { name, tokenId, email, imageUrl } = response.profileObj;
    setUser({
      name,
      isLoggedIn: true,
      userImage: imageUrl,
      email,
      isLoading: false,
      tokenId,
    });
  };

  return (
    <HomePageWrapper>
      <LeftSideContainer>
        <PollAnimation />
        <animated.div style={{ ...props, zIndex: 2 }}>
          <Typography className="title-left">
            <Title>PollApp</Title>
            <Title level={5}>Create your own polls.</Title>
          </Typography>
          <LeftSideUserContent>
            <RightSideContent
              isLoggedIn={user.isLoggedIn}
              name={user.name}
              responseGoogle={responseGoogle}
            />
          </LeftSideUserContent>
        </animated.div>
      </LeftSideContainer>
      <RightSideContainer>
        <div>
          <RightSideContent
            isLoggedIn={user.isLoggedIn}
            name={user.name}
            responseGoogle={responseGoogle}
          />
        </div>
      </RightSideContainer>
    </HomePageWrapper>
  );
};
export default App;
