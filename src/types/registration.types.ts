// src/types/registration.types.ts
export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  businessEmail: string;
  phoneNumber: string;
  companyName: string;
  businessWebsiteUrl: string;
  address: string;
  city: string;
  state: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | string;
  password: string;
  confirmPassword?: string;
}

export interface PasswordErrors {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
}
