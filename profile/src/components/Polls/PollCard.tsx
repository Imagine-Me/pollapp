import React from "react";
import { Button, Card, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import { PollsType } from "./Polls";
import styled from "styled-components";

const { Title } = Typography;
const CardStyled = styled(Card)`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
`;

const PollCard = (props: PollsType) => {
  return (
    <Col xs={6}>
      <CardStyled bordered={false}>
        <Typography>
          <Title ellipsis level={4}>
            {props.title}
          </Title>
          <Title level={5}>Questions - {props.questionCount}</Title>
        </Typography>
        <Link style={{ marginRight: "10px" }} to={`${props.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button>Create Poll</Button>
      </CardStyled>
    </Col>
  );
};

export default PollCard;
