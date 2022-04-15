import * as React from "react";

const Heading = React.lazy(() => import("authentication/App"));
const App = () => {
  return (
    <>
      <h1>Hello There</h1>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Heading />
      </React.Suspense>
    </>
  );
};
export default App;
