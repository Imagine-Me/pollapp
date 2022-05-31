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
