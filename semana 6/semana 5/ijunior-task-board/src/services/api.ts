import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev',
});


api.interceptors.request.use((config) => {
  const token = "Colocar token aqui"; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});