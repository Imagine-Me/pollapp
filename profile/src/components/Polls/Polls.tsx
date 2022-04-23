import { Breadcrumb } from "antd";
import React from "react";

const BreadCrumpStyled = () => (
  <Breadcrumb>
    <Breadcrumb.Item>Profile</Breadcrumb.Item>
    <Breadcrumb.Item>Poll</Breadcrumb.Item>
  </Breadcrumb>
);

const Polls = () => (
  <>
    <BreadCrumpStyled />
  </>
);

export default Polls;
