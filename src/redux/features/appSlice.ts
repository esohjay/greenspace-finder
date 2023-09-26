// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
// import axios from "axios";

interface AppState {
  isSearchOpen: boolean;
  isAddressModalOpen: boolean;
}
const initialState: AppState = {
  isSearchOpen: false,
  isAddressModalOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchState: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setAddressModalState: (state) => {
      state.isAddressModalOpen = !state.isAddressModalOpen;
    },
  },
  extraReducers: (builder) => {},
});
export const { setSearchState, setAddressModalState } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchState = (state: RootState) => state.app.isSearchOpen;
export const selectAddressModalState = (state: RootState) =>
  state.app.isAddressModalOpen;

export default appSlice.reducer;
