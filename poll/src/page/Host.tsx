import React, { useEffect } from "react";

import { useSocket } from "utils/hooks/socket";

const HostComponent = () => {
  const s = useSocket();
  useEffect(() => {
    s.on("connect", () => {
      console.log("connected");
    });
  }, []);
  return <h1>Host</h1>;
};

export default HostComponent;
