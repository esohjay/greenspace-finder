// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Data = {
  address: string | null;
  avatar_url: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  latitude: number | null;
  location: unknown | null;
  longitude: number | null;
  phone: string | null;
  search_radius: number | null;
  unit: string | null;
  updated_at: string | null;
};
// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `/` }),
  endpoints: (builder) => ({
    getUser: builder.query<Data, null>({
      query: () => ({
        url: `auth`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery } = api;
