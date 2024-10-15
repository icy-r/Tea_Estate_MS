import axios from "axios";

const baseURL = import.meta.env.HOSTED_URL || "http://localhost:3001";

const instance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default instance;