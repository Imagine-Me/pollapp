

declare module "authentication/App" {
  import { FC } from "react";
  export = FC;
}
declare module "profile/App" {
  import { FC } from "react";
  export = FC;
}
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
