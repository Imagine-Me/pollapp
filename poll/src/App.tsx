import React, { useEffect, useState } from "react";
import { axiosInstance } from "utils/axios/instance";
import { notify } from "utils/notify";
import { Route, Routes, useParams } from "react-router-dom";

if (process.env.NODE_ENV) {
  import("./App.css");
}

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
  const [loading, setLoading] = useState<boolean>(true);

  const location = useParams();

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  const fetchRoomDetails = async () => {
    const pollId = location["*"];
    if (pollId) {
      try {
        const { data } = await axiosInstance.get(`/room/${pollId}`);
        console.log("USER TYPE", data.type);
        setUserType(data.type);
      } catch (e) {
        notify("Error", "Server error");
      }
      setLoading(false);
    }
  };
  return <h1>Hello world</h1>;
};

export default Wrapper;
