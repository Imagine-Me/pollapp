import { Breadcrumb, Col, notification, Row, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "utils/axios/instance";
import styled from "styled-components";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import PollCard from "../components/Polls/PollCard";

const BreadCrumpStyled = styled((props) => (
  <Breadcrumb {...props} separator="">
    <Breadcrumb.Item>Poll</Breadcrumb.Item>
  </Breadcrumb>
))`
  ol {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    align-items: center;
  }
`;
const AddPollButton = styled((props) => <div {...props} />)`
  height: 100%;
  background: white;
  border: 1px solid grey;
  border-style: dashed;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #1890ff;
    transform: scale(1.01);
    border-color: #1890ff;
  }
`;

export interface PollsType {
  id: string;
  title: string;
  userId: string;
  type: "private" | "public";
  createdAt: string;
  updatedAt: string;
  questionCount: string;
}

const Polls = () => {
  const [polls, setPolls] = useState<PollsType[]>([]);
  const [pollName, setPollName] = useState<string>("");
  const [pollNameError, setPollNameError] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pollLoading, setPollLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const { data } = await axiosInstance.get("/polls");
      if (data === undefined || !Array.isArray(data)) {
        throw Error("Server error");
      }
      setPolls(data);
    } catch (e) {
      notification.error({
        message: `Error`,
        description: `${e}`,
      });
    }
  };

  const createPoll = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (pollName) {
      setPollLoading(true);
      setPollNameError(false);
      await axiosInstance.post(`/polls/create`, {
        title: pollName,
      });
      await fetchPolls();
      setModalVisible(false);
    } else {
      setPollNameError(true);
    }
    setPollLoading(false);
  };

  return (
    <div style={{ padding: "10px 30px" }}>
      <BreadCrumpStyled />
      <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <AddPollButton onClick={() => setModalVisible(true)}>
            <div>
              <PlusOutlined size={24} /> Add Poll
            </div>
          </AddPollButton>
        </Col>
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} fetchPolls={fetchPolls} />
        ))}
      </Row>
      <Modal
        title="Create poll"
        visible={modalVisible}
        onOk={createPoll}
        onCancel={() => setModalVisible(false)}
        okText={<>{pollLoading && <LoadingOutlined />}create</>}
      >
        <Input
          placeholder="Enter poll name"
          value={pollName}
          onChange={(e) => setPollName(e.target.value)}
          status={(pollNameError && "error") || ""}
        />
      </Modal>
    </div>
  );
};

export default Polls;
