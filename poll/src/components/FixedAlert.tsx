import { Alert } from "antd";
import styled from "styled-components";

const FixedAlert = styled(Alert)`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

export default FixedAlert;
