import React from "react";
import { Button, Card, Col, Modal, Typography } from "antd";
import { Link } from "react-router-dom";
import { PollsType } from "./Polls";
import styled from "styled-components";
import { axiosInstance } from "../../axios/instance";
import notify from "../notify";

const { Title } = Typography;
const CardStyled = styled(Card)`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
`;

interface PollCardInterface {
  poll: PollsType;
  fetchPolls: () => Promise<void>;
}

const PollCard = ({ poll, fetchPolls }: PollCardInterface) => {
  const deletePoll = (id: string) => {
    Modal.error({
      title: "Caution",
      content: "Are you sure you want to delete the poll?",
      async onOk() {
        try {
          await axiosInstance.delete(`/polls/delete/${id}`);
          await fetchPolls();
        } catch (e) {
          notify("Success", "Poll deleted", "error");
        }
      },
    });
  };
  return (
    <Col xs={6}>
      <CardStyled bordered={false}>
        <Typography>
          <Title ellipsis level={4}>
            {poll.title}
          </Title>
          <Title level={5}>Questions - {poll.questionCount}</Title>
        </Typography>
        <Link style={{ marginRight: "10px" }} to={`${poll.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button style={{ marginRight: "10px" }}>Create Poll</Button>
        <Button danger onClick={() => deletePoll(poll.id)}>
          delete
        </Button>
      </CardStyled>
    </Col>
  );
};

export default PollCard;
