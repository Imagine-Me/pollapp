import { EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Typography } from "antd";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../../axios/instance";
import notify from "../notify";

const { Paragraph } = Typography;

interface Props {
  pollId?: string;
}

const BreadCrumpStyled = ({ pollId }: Props) => {
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  const fetchPoll = async () => {
    try {
      const { data } = await axiosInstance.get(`/polls/${pollId}`);
      setTitle(data.title);
    } catch (e) {
      notify("Server Error", `${e}`);
    }
  };

  const updatePoll = async () => {
    try {
      await axiosInstance.post("/polls/create", {
        id: pollId,
        title,
      });
      notify(
        "Poll title updated",
        <span>
          Title updated to <Paragraph code>{title}</Paragraph>
        </span>,
        "success"
      );
      setEdit(false);
    } catch (e) {
      notify("Server Error", `${e}`);
    }
  };

  return (
    <Breadcrumb>
      <Breadcrumb.Item>Profile</Breadcrumb.Item>
      <Breadcrumb.Item>Poll</Breadcrumb.Item>
      <Breadcrumb.Item>
        {edit ? (
          <Input
            style={{ width: "200px" }}
            value={title}
            onChange={onChange}
            onBlur={updatePoll}
          />
        ) : (
          <>
            {title}{" "}
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => setEdit(true)}
            />
          </>
        )}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumpStyled;
