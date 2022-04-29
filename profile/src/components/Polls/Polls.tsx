import { Breadcrumb, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserProps, userState } from "authentication/recoil/user";

import PollCard from "./PollCard";
import { axiosInstance } from "../../axios/instance";

const BreadCrumpStyled = () => (
  <Breadcrumb>
    <Breadcrumb.Item>Profile</Breadcrumb.Item>
    <Breadcrumb.Item>Poll</Breadcrumb.Item>
  </Breadcrumb>
);

export interface PollsType {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  questionCount: string;
}

const Polls = () => {
  const [polls, setPolls] = useState<PollsType[]>([]);
  const user: UserProps = useRecoilValue(userState);
  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const { data } = await axiosInstance.get("/polls", {
        headers: {
          Authorization: `Bearer ${user.tokenId}`,
        },
      });
      setPolls(data);
    } catch (e) {
      notification.error({
        message: `Error`,
        description: `${e}`,
      });
    }
  };
  return (
    <>
      <BreadCrumpStyled />
      <Row gutter={16} style={{ marginTop: "10px" }}>
        {polls.map((poll) => (
          <PollCard key={poll.id} {...poll} />
        ))}
      </Row>
    </>
  );
};

export default Polls;
