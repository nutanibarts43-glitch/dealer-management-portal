// src/types/login.types.ts
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string;
  user?: any;
  role?: string;
}
