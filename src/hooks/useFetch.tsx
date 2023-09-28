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
  const updateProfile = async ({
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
  return { getProfile, updateProfile };
}

export default useFetch;
