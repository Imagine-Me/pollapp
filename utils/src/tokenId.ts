import { UserProps } from "authentication/recoil/user";

export const getTokenId = () => {
  const userData = sessionStorage.getItem("pollapp");
  let tokenId = "";
  if (userData) {
    let data = JSON.parse(userData) as UserProps;
    tokenId = data.tokenId ?? "";
  }
  return tokenId;
};

export const getFromLocalStorage = (key: string) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

export const setToLocalStorage = (key: string, value: Record<string, any>) => {
  const data = JSON.stringify(value);
  sessionStorage.setItem(key, data);
};

export const updateLocalStorage = (key: string, value: Record<string, any>) => {
  const oldData = getFromLocalStorage(key);
  const data = {
    ...oldData,
    ...value,
  };
  sessionStorage.setItem(key, JSON.stringify(data));
};
