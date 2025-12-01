// src/services/mockApi.ts
import type { LoginFormData } from "../types/login.types";
import type { RegistrationFormData } from "../types/registration.types";

type StoredUser = RegistrationFormData & { userId: string };

const USERS_KEY = "dm_users";

/**
 * small helper to read/write users from localStorage
 */
function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as StoredUser[];
  } catch {
    return [];
  }
}
function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * generate simple token (mock)
 */
function makeToken(userId: string) {
  return `mock-token-${userId}-${Date.now()}`;
}

export const mockApiService = {
  register: async (data: RegistrationFormData) => {
    return new Promise<{
      message: string;
      userId: string;
      token: string;
      user: any;
    }>((resolve, reject) => {
      setTimeout(() => {
        const users = readUsers();
        const exists = users.find(
          (u) =>
            u.businessEmail.toLowerCase() === data.businessEmail.toLowerCase()
        );
        if (exists) {
          reject(new Error("Email already registered"));
          return;
        }

        const userId = `U${Math.floor(Math.random() * 900000 + 100000)}`;
        const newUser: StoredUser = { ...data, userId };
        users.push(newUser);
        writeUsers(users);

        const token = makeToken(userId);

        resolve({
          message: "Registration successful",
          userId,
          token,
          user: {
            userId,
            firstName: data.firstName,
            lastName: data.lastName,
            businessEmail: data.businessEmail,
            companyName: data.companyName,
            tier: data.tier,
          },
        });
      }, 700);
    });
  },

  login: async (payload: LoginFormData) => {
    return new Promise<{
      message: string;
      token: string;
      user: any;
      role: "dealer";
    }>((resolve, reject) => {
      setTimeout(() => {
        const users = readUsers();
        // check both businessEmail and email keys to be safe
        const user = users.find(
          (u) =>
            u.businessEmail &&
            u.businessEmail.toLowerCase() === payload.email.toLowerCase() &&
            u.password === payload.password
        );

        // also allow fallback development account
        const devOk =
          payload.email === "test@test.com" && payload.password === "123456";
        if (user || devOk) {
          const actual = user ?? {
            userId: "dev-user",
            firstName: "Dev",
            lastName: "User",
            businessEmail: "test@test.com",
            companyName: "Dev Co",
            tier: "bronze",
          };
          const token = makeToken(actual.userId);
          resolve({
            message: "Login successful",
            token,
            user: {
              userId: actual.userId,
              firstName: actual.firstName,
              lastName: actual.lastName,
              businessEmail: actual.businessEmail,
              companyName: actual.companyName,
              tier: actual.tier,
            },
            role: "dealer",
          });
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 600);
    });
  },
};
