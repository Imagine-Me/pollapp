import * as React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

const Authentication = React.lazy(() => import("authentication/App"));
const Profile = React.lazy(() => import("profile/App"));

const App = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/user/*" element={<Profile />} />
      </Routes>
    </React.Suspense>
  );
};
export default App;
