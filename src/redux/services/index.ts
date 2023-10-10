// Need to use the React-specific entry point to allow generating React hooks
import {
  createApi,
  fetchBaseQuery,
  fakeBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/auth-helpers-nextjs";
import { Profile } from "@/types/user";
import { AuthError } from "@supabase/supabase-js";

type SignInData = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
};
type SignedInData = {
  user: User | null;
  session: Session | null;
};
// Define a service using a base URL and expected endpoints
export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation<SignedInData | AuthError, SignInData>({
      queryFn: async (arg) => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase.auth.signUp({
          email: arg.email,
          password: arg.password,
          options: {
            data: {
              first_name: arg.first_name,
              last_name: arg.last_name,
            },
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) {
          const authError = error as AuthError;
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["User"],
    }),
    signIn: builder.mutation<SignedInData, SignInData>({
      queryFn: async (arg) => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase.auth.signInWithPassword({
          email: arg.email,
          password: arg.password,
        });
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["User"],
    }),
    getUser: builder.query<Profile[] | null, string>({
      queryFn: async (id) => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", id);
        if (error) {
          return { error };
        }
        return { data };
      },
      providesTags: ["User"],
    }),
    getAllUsers: builder.query<Profile[] | null, null>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase.from("profiles").select();
        console.log(data);
        if (error) {
          return { error };
        }
        return { data };
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "User" as const, id })), "User"]
          : ["User"],
    }),
    editUser: builder.mutation<Profile[], Profile>({
      queryFn: async (arg) => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase
          .from("profiles")
          .update(arg)
          .eq("id", arg.id)
          .select();
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation<string, string>({
      queryFn: async (arg) => {
        // Supabase conveniently already has `data` and `error` fields

        const { error } = await supabase
          .from("countries")
          .delete()
          .eq("id", arg);
        if (error) {
          return { error };
        }
        return { data: "Deleted successfully" };
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useSignInMutation,
  useRegisterMutation,
} = supabaseApi;
