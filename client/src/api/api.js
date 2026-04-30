import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-s7nh.onrender.com/api/v1",
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;