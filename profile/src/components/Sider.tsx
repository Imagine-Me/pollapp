import { Button, Layout, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

const NavLinkStyled = styled((props) => <NavLink {...props} />)`
  display: block;
  text-align: center;
  padding: 5px 15px;
  transition: none;
  border-radius: 7px;
  font-size: 16px;
  color: black;
  font-weight: 500;
  margin: 5px;
  &.active {
    background-color: #1890ff;
    color: white;
  }
  &:hover {
    background-color: #1890ff;
    color: white;
  }
`;

const SiderStyled = styled((props) => (
  <Sider {...props}>
    <div>
      <NavLinkStyled to="polls">Polls</NavLinkStyled>
      <NavLinkStyled to="user">Profile</NavLinkStyled>
    </div>
  </Sider>
))`
> div {
    background-color: #f0f2f5;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: end;
    padding: 20px;
    > div {
      min-width: 150px;
    }
  }
`;
export default SiderStyled;
