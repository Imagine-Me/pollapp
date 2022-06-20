import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

const { Content } = Layout;

const ContentStyled = styled((props) => <Content {...props} />)``;
export default ContentStyled;
