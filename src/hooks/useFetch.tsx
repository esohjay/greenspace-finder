import React from "react";
import { Database } from "@/types/supabase";
// import { cookies } from "next/headers";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

function useFetch() {
  const supabase = createClientComponentClient<Database>();
  const userSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.user;
  };
  const getProfile = async () => {
    const user = await userSession();
    let { error, data } = await supabase
      .from("profiles")
      .select()
      .eq("id", `${user?.id}`);
    return { data, error };
  };
  const updateLocation = async ({
    location,
    lat,
    long,
  }: {
    location: string;
    lat: number;
    long: number;
  }) => {
    const user = await userSession();
    console.log(user);
    let { error, data } = await supabase
      .from("profiles")
      .update({
        location: location,
        latitude: lat,
        longitude: long,
      })
      .eq("id", `${user?.id}`);
    return { error, data };
  };
  const updateProfile = async ({
    phone,
    search_radius,
    first_name,
    last_name,
  }: {
    phone: string;
    search_radius: number;
    first_name: string;
    last_name: string;
    unit: string;
  }) => {
    const user = await userSession();
    console.log(user);
    let { error, data } = await supabase
      .from("profiles")
      .update({
        first_name,
        last_name,
        phone,
        search_radius,
      })
      .eq("id", `${user?.id}`);
    return { error, data };
  };
  const emailUpdate = async (email: string) => {
    const { data, error } = await supabase.auth.updateUser({ email });
    return { data, error };
  };
  const passwordUpdate = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({ password });
    return { data, error };
  };
  return {
    getProfile,
    updateLocation,
    updateProfile,
    emailUpdate,
    passwordUpdate,
  };
}

export default useFetch;
