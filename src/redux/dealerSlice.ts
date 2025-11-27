import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DealerTier = "bronze" | "silver" | "gold" | "platinum";

interface DealerState {
  tier: DealerTier;
  name: string;
  email: string;
}

const initialState: DealerState = {
  tier: "gold", // can change based on login
  name: "",
  email: "",
};

const dealerSlice = createSlice({
  name: "dealer",
  initialState,
  reducers: {
    updateDealer(state, action: PayloadAction<Partial<DealerState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateDealer } = dealerSlice.actions;
export default dealerSlice.reducer;
