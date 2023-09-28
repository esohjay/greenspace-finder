import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/features/authSlice";
import mapSlice from "@/redux/features/mapSlice";
import appSlice from "./features/appSlice";
import { api } from "./services";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice,
    app: appSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
