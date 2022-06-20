import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { userState } from "authentication/recoil/user";


import { useSetRecoilState } from "recoil";

import Loading from "./components/Loading";
import "./App.css";

const Authentication = React.lazy(() => import("authentication/App"));
const Profile = React.lazy(() => import("profile/App"));
const Poll = React.lazy(() => import("poll/App"));

const App = () => {
  const setUserState = useSetRecoilState(userState);
  React.useEffect(() => {
    const userData = sessionStorage.getItem("pollapp");
    if (userData) {
      setUserState(JSON.parse(userData));
    }
  }, []);

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/user/*" element={<Profile />} />
        <Route path="/poll/*" element={<Poll />} />
      </Routes>
    </React.Suspense>
  );
};
export default App;
