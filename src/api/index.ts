import axios, { AxiosRequestConfig } from "axios";
import AuthService from "./AuthService";


export const API_URL = 'https://azapp-playground-demo-api.azurewebsites.net/api';

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

$api.interceptors.response.use(
  (response) => response, 
async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401) {
    AuthService.refreshToken(localStorage.getItem("token"), localStorage.getItem("refreshToken"))
    .then((resp) => {
      localStorage.setItem("token", resp.data.token );
      localStorage.setItem("refreshToken", resp.data.refreshToken);
      $api.request(originalRequest)
    })
  } 
  return Promise.reject(error);
})

export default $api;