import { atom } from "recoil";

export interface JoinDataProps {
  answer: number | null;
  isPolled: boolean;
  showChart: boolean;
}

export const joinUserData = atom({
  key: "joinData",
  default: {
    answer: null,
    isPolled: false,
    showChart: false,
  } as JoinDataProps,
});
