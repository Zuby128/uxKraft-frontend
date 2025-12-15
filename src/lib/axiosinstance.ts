import axios from "axios";
import { config } from "../config/config";

const baseURL = config.API_URL;

export const secureApi = async () => {
  const token = await window.localStorage.getItem(config.TOKEN);

  return axios.create({
    baseURL,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const api = async () => {
  return axios.create({ baseURL });
};
