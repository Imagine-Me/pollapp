import React, { useEffect } from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserProps, userState } from "authentication/recoil/user";

import ContentStyled from "./components/Content";

import Polls from "./components/Polls/Polls";
import Profile from "./components/Profile/Profile";
import Questions from "./components/Questions/Question";

import SiderStyled from "./components/Sider";
import { axiosInstance } from "./axios/instance";

if (process.env.NODE_ENV) {
  import("./App.css");
}

const App = () => {
  const user = useRecoilValue<UserProps>(userState);
  useEffect(() => {
    axiosInstance.interceptors.request.use(function (config) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${user.tokenId}`;
      return config;
    });
  }, []);
  return (
    <Layout>
      <SiderStyled />
      <ContentStyled>
        <Routes>
          <Route path="/user" element={<Profile />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/polls/:pollId" element={<Questions />} />
        </Routes>
      </ContentStyled>
    </Layout>
  );
};

export default App;
