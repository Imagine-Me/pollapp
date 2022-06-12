import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/User";

if (process.env.NODE_ENV) {
  import("./App.css");
}

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<UserPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
