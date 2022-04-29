import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import ContentStyled from "./components/Content";

import Polls from "./components/Polls/Polls";
import Profile from "./components/Profile/Profile";
import Questions from "./components/Questions/Question";

import SiderStyled from "./components/Sider";

if (process.env.NODE_ENV) {
  import("./App.css");
}

const App = () => {
  return (
    <Layout>
      <SiderStyled />
      <ContentStyled>
        <Routes>
          <Route path="/user" element={<Profile />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/polls/:id" element={<Questions />} />
        </Routes>
      </ContentStyled>
    </Layout>
  );
};

export default App;
