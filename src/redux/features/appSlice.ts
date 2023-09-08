// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
// import axios from "axios";

interface AppState {
  isSearchOpen: boolean;
}
const initialState: AppState = {
  isSearchOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchState: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
  },
  extraReducers: (builder) => {},
});
export const { setSearchState } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchState = (state: RootState) => state.app.isSearchOpen;

export default appSlice.reducer;
