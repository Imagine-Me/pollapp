import React from "react";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const LoadingComponent = styled((props) => {
  return (
    <div {...props}>
      <LoadingOutlined style={{ fontSize: "40px" }} />
      <Title level={4} style={{ marginLeft: "15px" }}>
        Connecting to server
      </Title>
    </div>
  );
})`
  display: flex;
  align-items: center;
`;

export default LoadingComponent;
