import { atom } from "recoil";

interface UserProps {
  name: string;
  isLoggedIn: boolean;
  userImage: string;
  email: string;
  isLoading: boolean;
  tokenId: string | null;
}

export const userState = atom({
  key: "userState",
  default: {
    name: "",
    isLoggedIn: false,
    userImage: "",
    email: "",
    isLoading: false,
    tokenId: null,
  } as UserProps,
});
