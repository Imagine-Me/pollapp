import React from "react";
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

  const responseGoogle = (response: any) => {
    if (response.profileObj) {
      const { tokenId, profileObj } = response;
      const { name, email, imageUrl } = profileObj;
      const data = {
        name,
        isLoggedIn: true,
        userImage: imageUrl,
        email,
        isLoading: false,
        tokenId,
      };
      sessionStorage.setItem("pollapp", JSON.stringify(data));
      setUser(data);
    }
  };

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
