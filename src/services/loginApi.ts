// src/services/loginApi.ts
import { mockApiService } from "./mockApi";
import type { LoginFormData } from "../types/login.types";

export const loginApi = {
  login: async (payload: LoginFormData) => {
    return mockApiService.login(payload);
  },
};
