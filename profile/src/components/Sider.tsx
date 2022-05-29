import { Layout } from "antd";
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

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
      <NavLinkStyled to="profile">Profile</NavLinkStyled>
    </div>
  </Sider>
))`
  background-color: #f0f2f5 !important;
  > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 90%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    width: 100%;
    border-right: 1px solid #d9d9d9;
    > div {
      width: 100%;
    }
  }
`;
export default SiderStyled;
