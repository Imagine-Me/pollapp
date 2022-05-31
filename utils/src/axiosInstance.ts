import axios from "axios";
import { notify } from "./notify";
import { getTokenId } from "./tokenId";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    authorization: getTokenId() ? `Bearer ${getTokenId()}` : false,
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
