
declare module "utils/axios/instance" {
  import { AxiosInstance } from "axios";
  interface AxiosInstanceE extends AxiosInstance {}
  export const axiosInstance: AxiosInstanceE;
}
declare module "utils/notify" {
  import { NotificationInstance } from "antd/lib/notification";
  interface NotificationInstanceE extends NotificationInstance {}
  export const notify = (
    message: string,
    description: React.ReactNode,
    type?: keyof NotificationInstanceE
  ) => {};
}
declare module "utils/hooks/socket" {
  import { Socket, DefaultEventsMap } from "socket.io-client";
  interface Props {
    id: string;
    type: "host" | "join";
    [x: string]: string;
  }
  export const useSocket: (
    x: Props
  ) => Socket<DefaultEventsMap, DefaultEventsMap>;
}

declare module "*.css";
