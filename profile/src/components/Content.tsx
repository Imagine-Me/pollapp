import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

const { Content } = Layout;

const ContentStyled = styled((props) => <Content {...props} />)`
  padding: 30px
`;
export default ContentStyled;
