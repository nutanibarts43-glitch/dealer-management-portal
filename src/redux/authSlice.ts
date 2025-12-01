// src/redux/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState, IUser, UserRole } from "../types/auth.types";

const STORAGE_KEY = "dm_auth_v1";

function loadFromStorage(): IAuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { token: null, role: null, user: null };
    }
    const parsed = JSON.parse(raw);
    return {
      token: parsed.token ?? null,
      role: parsed.role ?? null,
      user: parsed.user ?? null,
    } as IAuthState;
  } catch {
    return { token: null, role: null, user: null };
  }
}

const initialState: IAuthState = loadFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        role: UserRole;
        user: IUser;
      }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;

      // persist
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            token: state.token,
            role: state.role,
            user: state.user,
          })
        );
      } catch {}
    },

    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
