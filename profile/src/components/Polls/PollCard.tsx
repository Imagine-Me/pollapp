import React from "react";
import { Card, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import { PollsType } from "./Polls";
import styled from "styled-components";

const { Title } = Typography;

const CardStyled = styled(Card)`
  transition: transform 0.3s ease-in-out;
  background: #e1e1e1 !important;
  &:hover {
    transform: scale(1.05);
  }
`;

const PollCard = (props: PollsType) => {
  return (
    <Col xs={6}>
      <Link to={`${props.id}`}>
        <CardStyled bordered={false}>
          <Typography>
            <Title ellipsis level={4}>
              {props.title}
            </Title>
            <Title level={5}>Questions - {props.questionCount}</Title>
          </Typography>
        </CardStyled>
      </Link>
    </Col>
  );
};

export default PollCard;
