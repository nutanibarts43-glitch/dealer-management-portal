// src/types/auth.types.ts
export type UserRole = "admin" | "dealer" | "guest";

export interface IUser {
  userId: string;
  firstName?: string;
  lastName?: string;
  businessEmail?: string;
  companyName?: string;
  tier?: "bronze" | "silver" | "gold" | "platinum" | string;
}

export interface IAuthState {
  token: string | null;
  role: UserRole | null;
  user: IUser | null;
}
