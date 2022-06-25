import React from "react";
import { Button, Layout, Typography } from "antd";
import { Routes, Route } from "react-router-dom";
import Polls from "./pages/Polls";
import Questions from "./pages/Question";
import ContentStyled from "./components/Content";
import styled from "styled-components";

if (location.host === process.env.APP_URL) {
  import("./App.css");
}

const { Header } = Layout;
const { Title } = Typography;

const HeaderStyled = styled(Header)`
  background-color: white !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px !important;
`;

const App = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <HeaderStyled>
        <Title level={3} style={{ lineHeight: "inherit", margin: 0 }}>
          PollApp
        </Title>
        <Button type="text" danger>
          Logout
        </Button>
      </HeaderStyled>
      <ContentStyled>
        <Routes>
          <Route path="/polls" element={<Polls />} />
          <Route path="/polls/:pollId" element={<Questions />} />
        </Routes>
      </ContentStyled>
    </Layout>
  );
};

export default App;
