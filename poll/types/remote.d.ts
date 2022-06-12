declare module "authentication/recoil/user" {
  import { RecoilState } from "recoil";
  interface UserProps {
    name: string;
    isLoggedIn: boolean;
    userImage: string;
    email: string;
    isLoading: boolean;
    tokenId: string | null;
  }
  type UserState = RecoilState<UserProps>;
  export const userState = UserState;
}

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
