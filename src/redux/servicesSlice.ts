import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ServiceItemType } from "../types/service.types";

interface ServicesState {
  list: ServiceItemType[];
}

const initialState: ServicesState = {
  list: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<ServiceItemType>) => {
      state.list.push(action.payload);
    },

    updateService: (state, action: PayloadAction<ServiceItemType>) => {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    deleteService: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },

    reorderServices: (state, action: PayloadAction<ServiceItemType[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addService, updateService, deleteService, reorderServices } =
  servicesSlice.actions;

export default servicesSlice.reducer;
