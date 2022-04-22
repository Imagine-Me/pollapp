import React from "react";
import { Layout } from "antd";

import ContentStyled from "./components/Content";
import SiderStyled from "./components/Sider";

import "./App.css"

const App = () => {
  return <Layout>
      <SiderStyled />
      <ContentStyled>This is ContentStyled</ContentStyled>
  </Layout>;
};

export default App;
