import React from "react";
import { Layout } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";

import Polls from "./components/Polls/Polls";
import Profile from "./components/Profile/Profile";
import ContentStyled from "./components/Content";
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
          <Route path="/polls" element={<Polls />} />
          <Route path="/user" element={<Profile />} />
        </Routes>
      </ContentStyled>
    </Layout>
  );
};

export default App;
