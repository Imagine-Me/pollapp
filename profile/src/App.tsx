import React from "react";
import { Layout } from "antd";

const { Sider, Content } = Layout;
const App = () => {
  return <Layout>
      <Sider>This is sider</Sider>
      <Content>This is content</Content>
  </Layout>;
};

export default App;
