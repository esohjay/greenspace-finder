// Need to use the React-specific entry point to allow generating React hooks
import {
  createApi,
  fetchBaseQuery,
  fakeBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabase";

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
export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query<Data[] | null, string>({
      queryFn: async (id) => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", id);
        console.log(data);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    getAllUsers: builder.query<Data[] | null, null>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase.from("profiles").select();
        console.log(data);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery } = supabaseApi;
