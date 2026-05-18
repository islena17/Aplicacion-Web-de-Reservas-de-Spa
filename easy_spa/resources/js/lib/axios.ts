import axios from "axios";

const api = axios.create({
  // Al poner solo '/api', funcionará automáticamente en localhost 
  // y en Render sin tener que tocar el código nunca más
  baseURL: "/api", 
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
  },
});

export default api;
