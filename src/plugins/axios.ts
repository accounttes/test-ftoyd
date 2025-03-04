import axios from 'axios';

export const backendUrl = `https://app.ftoyd.com/fronttemp-service`;

export const socketUrl = `wss://app.ftoyd.com/fronttemp-service/ws`;

const api = axios.create({
  baseURL: backendUrl,
  timeout: 5000,
});

export default api;
