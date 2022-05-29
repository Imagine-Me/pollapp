import { NotificationInstance } from "antd/lib/notification";
import { notification } from "antd";

const notify = (
  message: string,
  description: React.ReactNode,
  type: keyof NotificationInstance = "error"
) => {
  notification[type]({
    message,
    description,
  });
};

export default notify;
