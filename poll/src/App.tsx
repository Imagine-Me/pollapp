import React, { useEffect, useState } from "react";
import { axiosInstance } from "utils/axios/instance";
import { Route, Routes, useParams } from "react-router-dom";
import { Typography } from "antd";

import LoadingComponent from "./components/Loading";
import HostComponent from "./page/Host";
import JoinComponent from "./page/Join";
import CenterComponent from "./components/Center";

if (location.host === process.env.APP_URL) {
  import("./App.css");
}

const { Title } = Typography;

const Wrapper = () => {
  return (
    <Routes>
      <Route path="/:pollId" element={<App />} />
    </Routes>
  );
};

type UserType = "host" | "join" | null;

const App = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const location = useParams();

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  const fetchRoomDetails = async () => {
    const pollId = location["*"];
    if (pollId) {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/room/${pollId}`);
        console.log("USER TYPE", data.type);
        setUserType(data.type);
      } catch (e) {}
      setLoading(false);
    }
  };
  let component = (
    <CenterComponent>
      <LoadingComponent />
    </CenterComponent>
  );
  if (loading === false) {
    switch (userType) {
      case "host":
        component = <HostComponent />;
        break;
      case "join":
        component = <JoinComponent />;
        break;
      default:
        component = (
          <CenterComponent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Title level={1}>404</Title>
              <Title level={4}>Oops, poll does not exists</Title>
            </div>
          </CenterComponent>
        );
    }
  }
  return <>{component}</>;
};

export default Wrapper;
