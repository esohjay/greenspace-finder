// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
// import axios from "axios";
// import { Database } from "@/types/supabase";
type User = {
  address: string | null;
  avatar_url: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  latitude: number | null;
  location: unknown | null;
  longitude: number | null;
  phone: string | null;
  updated_at: string | null;
};
interface AuthState {
  user: User | null;
  status: "loading" | "success" | "error" | "idle";
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

// type UserDetails = {
//   email: string;
//   password: string;
//   first_name?: string;
//   last_name?: string;
// };
// initalize supabase
// const supabase = createClientComponentClient<Database>();
// export const login = createAsyncThunk(
//   "auth/login",
//   async (formData: UserDetails, { dispatch }) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: formData.email,
//       password: formData.password,
//     });
//     if (error) {
//       dispatch(setError(error));
//     }
//     return data.user;
//   }
// );
export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<"loading" | "success" | "error" | "idle">
    ) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    //login
    // builder.addCase(
    //     login.fulfilled,
    //     (state: AuthState, action) => {
    //       state.user = action.payload;
    //       state.status = "success";
    //     }
    //   );
    //   builder.addCase(
    //     login.rejected,
    //     (state: AuthState, action) => {
    //       state.status = "failed";
    //     }
    //   );
    //   builder.addCase(
    //     login.pending,
    //     (state: AuthState, action) => {
    //       state.status = "pending";
    //     }
    //   );
  },
});
export const { setError, setUser, setStatus } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
