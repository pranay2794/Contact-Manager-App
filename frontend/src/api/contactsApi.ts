import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/contacts",
});

API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { accessToken } = JSON.parse(userInfo);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

export default API;
