import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "utils/hooks/socket";

const HostComponent = () => {
  const params = useParams();
  const s = useSocket({ id: params.pollId as string, type: "host" });
  useEffect(() => {
    s.on("connect", () => {
      console.log("connected");
    });
  }, []);
  return <h1>Host</h1>;
};

export default HostComponent;
