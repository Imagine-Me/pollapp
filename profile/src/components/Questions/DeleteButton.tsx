import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const DeleteButton = styled((props) => (
  <Button {...props} type="primary" danger icon={<DeleteOutlined />}></Button>
))`
  position: absolute !important;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
`;
export default DeleteButton;
