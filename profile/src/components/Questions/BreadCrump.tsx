import { Breadcrumb, Input } from "antd";
import React from "react";
import { useState } from "react";

const BreadCrumpStyled = () => {
  const [title, setTitle] = useState("");
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Profile</Breadcrumb.Item>
      <Breadcrumb.Item>Poll</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Input style={{ width: "200px" }} />
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumpStyled;
