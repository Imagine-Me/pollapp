import React, { useState } from "react";
import { Button, Card, Col, Modal, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PollsType } from "../../pages/Polls";
import styled from "styled-components";
import { axiosInstance } from "utils/axios/instance";
import { notify } from "utils/notify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const ButtonContainer = styled((props) => <div {...props} />)`
  position: absolute;
  top: 15px;
  right: 15px;
`;
const TextStyled = styled(Text)`
  padding: 5px 7px;
  border: none;
  font-size: 10px;
  text-transform: uppercase;
  &.private {
    background-color: #76dc5130;
  }
  &.public {
    background-color: #ff000020;
  }
`;

const QuestionNumberText = styled(Title)`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

interface PollCardInterface {
  poll: PollsType;
  fetchPolls: () => Promise<void>;
}

const PollCard = ({ poll, fetchPolls }: PollCardInterface) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const createPoll = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`/room/create`, {
        pollId: id,
      });
      if (data.status) {
        const roomId = data.id;
        navigate(`/poll/${roomId}`);
      } else {
        notify("Error", data.msg);
      }
    } catch (e) {
      notify("Error", "Server error");
    }
    setLoading(false);
  };
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card bordered={false} hoverable>
        {poll.type === "private" && (
          <ButtonContainer>
            <Link to={`${poll.id}`}>
              <Button shape="circle" icon={<EditOutlined />} title="Edit" />
            </Link>
            <Button
              style={{ marginLeft: "7px" }}
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              title="Delete"
              onClick={() => deletePoll(poll.id)}
            />
          </ButtonContainer>
        )}
        <QuestionNumberText title="Question count" level={1}>
          {poll.questionCount}
        </QuestionNumberText>
        <Typography>
          <Title ellipsis level={3}>
            {poll.title}
          </Title>
        </Typography>
        <Typography>
          <TextStyled
            className={poll.type}
            title={
              poll.type === "private"
                ? "Poll created by you"
                : "Common polls (you can't edit this)"
            }
          >
            #{poll.type}
          </TextStyled>
        </Typography>
        <Button
          loading={loading}
          disabled={loading}
          style={{ marginTop: "10px" }}
          type="primary"
          size="large"
          onClick={() => createPoll(poll.id)}
        >
          Create Poll
        </Button>
      </Card>
    </Col>
  );
};

export default PollCard;
