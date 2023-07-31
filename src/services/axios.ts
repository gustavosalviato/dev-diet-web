/* eslint-disable prettier/prettier */
import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "@/context/authContext";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError<unknown, any>) => void;
}[] = [];

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${cookies["devdiet.token"]}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      cookies = parseCookies();

      const originalConfig = error.config;
      if (!isRefreshing) {
        isRefreshing = true;
        api
          .patch("/token/refresh")
          .then((response) => {
            const { token } = response.data;
            console.log(response);

            setCookie(undefined, "devdiet.token", token, {
              maxAge: 60 * 60 * 24 * 30,
              path: "/",
            });

            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            failedRequestsQueue.forEach((request) => request.resolve(token));
            failedRequestsQueue = [];
          })
          .catch((err) => {
            failedRequestsQueue.forEach((request) => request.reject(err));
            failedRequestsQueue = [];
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve: (token: string) => {
            originalConfig!.headers["Authorization"] = `Bearer ${token}`;

            resolve(api(originalConfig!));
          },
          reject: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    } else {
      signOut();
    }
    return Promise.reject(error);
  }
);
