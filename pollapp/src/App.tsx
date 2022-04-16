import * as React from "react";

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
