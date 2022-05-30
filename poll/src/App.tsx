import React from "react";

if (process.env.NODE_ENV) {
  import("./App.css");
}

const App = () => {
  return <h1>Hello world</h1>;
};
export default App;
