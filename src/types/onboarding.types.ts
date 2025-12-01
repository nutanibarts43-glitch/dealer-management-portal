export interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  businessEmail: string;
  companyName: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

export interface TierBenefits {
  title: string;
  features: string[];
}
