import React, { useEffect } from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserProps, userState } from "authentication/recoil/user";
import UserPage from "./pages/User";
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
      <Routes>
        <Route path="/*" element={<UserPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
