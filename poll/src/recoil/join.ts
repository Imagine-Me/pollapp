import { atom } from "recoil";

interface JoinDataProps {
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
