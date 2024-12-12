import axios from "axios";
import { AuthPayload, Tech } from "./types";
import { User } from "../types";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

const authService = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async ({ username, password }: AuthPayload) => {
  const { data } = await authService.post("/register", {
    username,
    password,
  });
  localStorage.setItem("token", data.token);
  return data.token;
};

export const login = async ({ username, password }: AuthPayload) => {
  const { data } = await authService.post("/login", {
    username,
    password,
  });
  localStorage.setItem("token", data.token);
  return data.token;
};

export const getTechs = async (filter?: string) => {
  const { data } = await service.get("/tech", {
    params: { filter },
  });
  return data;
};

export const submitTechs = async (techs: string[]): Promise<User> => {
  const { data } = await service.post("/tech", { techs });
  return data;
};

export const getMe = async (): Promise<Tech[]> => {
  const { data } = await service.get("/users/me");
  return data;
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await service.get("/users");
  return data;
};
