import * as React from "react";
import { userState } from "authentication/recoil/user";

const Authentication = React.lazy(() => import("authentication/App"));
const App = () => {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Authentication />
      </React.Suspense>
    </>
  );
};
export default App;
