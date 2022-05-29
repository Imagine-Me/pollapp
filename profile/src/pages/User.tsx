import React from "react";
import { Route, Routes } from "react-router-dom";
import ContentStyled from "../components/Content";
import Polls from "../components/Polls/Polls";
import Profile from "../components/Profile/Profile";
import Questions from "../components/Questions/Question";
import SiderStyled from "../components/Sider";

const UserPage = () => {
  return (
    <>
      <SiderStyled />
      <ContentStyled>
        <Routes>
          <Route path="" element={<Profile />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/polls/:pollId" element={<Questions />} />
        </Routes>
      </ContentStyled>
    </>
  );
};

export default UserPage;
