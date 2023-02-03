import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "http://142.93.134.108:1111",
  headers: {
    "Content-Type": "application/json",
  },
});
