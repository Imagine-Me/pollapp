import { UserProps } from "authentication/recoil/user";
import axios from "axios";
import { notify } from "./notify";

const userData = sessionStorage.getItem("pollapp");
let tokenId = "";
if (userData) {
  let data = JSON.parse(userData) as UserProps;
  tokenId = data.tokenId ?? "";
}

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    authorization: tokenId ? `Bearer ${tokenId}` : false,
  },
});

axiosInstance.interceptors.response.use(
  (onFullFill) => onFullFill,
  (onReject) => {
    if (onReject.response.status == 401) {
      notify("ERROR", "Authorization error");
    }
    return onReject;
  }
);
export { axiosInstance };
