import { UserProps } from "authentication/recoil/user";
import axios from "axios";

const userData = sessionStorage.getItem("pollapp");
let tokenId = null;
if (userData) {
  let data = JSON.parse(userData) as UserProps;
  tokenId = data.tokenId;
}

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${tokenId}`,
  },
});

export { axiosInstance };
