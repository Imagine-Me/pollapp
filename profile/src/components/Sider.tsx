import { Button, Layout, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Sider } = Layout;
const { Title } = Typography;

const SiderStyled = styled((props) => (
  <Sider {...props}>
    <div>
      <Button type="primary" block>
        Polls
      </Button>
      <Button type="primary" block>
        Profile
      </Button>
    </div>
  </Sider>
))`
  background-color: transparent;
  > div {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: end;
    text-align: center
    padding: 20px;
    button {
      margin: 10px;
      border-radius: 7px;
    }
  }
`;
export default SiderStyled;
