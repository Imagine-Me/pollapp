import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface Props {
  userCount: number;
}

const UserCountComponent = ({ userCount }: Props) => {
  return (
    <Title level={3} style={{ textAlign: "center" }}>
      User joined {userCount}
    </Title>
  );
};

export default UserCountComponent;
