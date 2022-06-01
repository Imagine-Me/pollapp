import { EditOutlined } from "@ant-design/icons";
import { Button, Input, Typography, Breadcrumb } from "antd";
import React, { useState, ChangeEvent, useEffect } from "react";
import { axiosInstance } from "utils/axios/instance";
import { notify } from "utils/notify";
import styled from "styled-components";

const { Paragraph } = Typography;

interface Props {
  pollId?: string;
}

const BreadCrumpStyled = styled(({ pollId, ...props }: Props) => {
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
    <Breadcrumb {...props} separator="">
      <Breadcrumb.Item>Profile</Breadcrumb.Item>
      <Breadcrumb.Separator>{">"}</Breadcrumb.Separator>
      <Breadcrumb.Item>Poll</Breadcrumb.Item>
      <Breadcrumb.Separator>{">"}</Breadcrumb.Separator>
      <Breadcrumb.Item>
        {edit ? (
          <Input
            style={{ width: "200px" }}
            value={title}
            onChange={onChange}
            onBlur={updatePoll}
            autoFocus
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
})`
  ol {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    align-items: center;
  }
`;

export default BreadCrumpStyled;
