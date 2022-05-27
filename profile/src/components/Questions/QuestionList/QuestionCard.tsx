import { Card } from "antd";
import styled from "styled-components";

const QuestionCard = styled(Card)`
  background-color: #fafafa !important;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  margin-bottom: 7px !important;
  position: relative;
  &.selected {
    border: 2px solid green;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export default QuestionCard;
