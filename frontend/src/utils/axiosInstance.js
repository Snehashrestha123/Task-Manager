// import axios from "axios";
// import { BASE_URL } from "./constants";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   }, 
// });
 
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;