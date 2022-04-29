import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "./recoil/atom/user";
import HomePageWrapper from "./components/HomePageWrapper";
import PollAnimation from "./components/PollAnimation";
import LeftSideContainer from "./components/LeftSideContainer";
import RightSideContainer, {
  RightSideContent,
} from "./components/RightSideContainer";
import LeftSideContent from "./components/LeftSideContent";

import "./App.css";

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const [_, setShow] = useState<boolean>(false);

  const responseGoogle = (response: any) => {
    if (response.profileObj) {
      const { tokenId, profileObj } = response;
      const { name, email, imageUrl } = profileObj;
      setUser({
        name,
        isLoggedIn: true,
        userImage: imageUrl,
        email,
        isLoading: false,
        tokenId,
      });
    }
  };

  //? This is required in order to work react spring from React v18. IDK why?
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    });
  }, []);

  return (
    <HomePageWrapper>
      <LeftSideContainer>
        <PollAnimation />
        <LeftSideContent>
          <RightSideContent
            isLoggedIn={user.isLoggedIn}
            name={user.name}
            responseGoogle={responseGoogle}
          />
        </LeftSideContent>
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
