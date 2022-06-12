import React from "react";
import { NotificationInstance } from "antd/lib/notification";
import { notification } from "antd";

export const notify = (
  message: string,
  description: React.ReactNode,
  type: keyof NotificationInstance = "error"
) => {
  notification[type]({
    message,
    description,
  });
};
