// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json"
  }
});

// Optionally, you can add interceptors for request/response
api.interceptors.request.use(
  (config) => {
    // You can add authorization token or other headers here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
