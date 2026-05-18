import axios from "axios";

const api = axios.create({
  baseURL: "https://easyspa.onrender.com/api", 
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
  },
});

export default api;
