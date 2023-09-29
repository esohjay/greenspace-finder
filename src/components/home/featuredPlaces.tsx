"use client";
import React from "react";
import CircleImage from "../circleImage";
import useGetExtent from "@/hooks/useGetExtent";
import useFetch from "@/hooks/useFetch";
import { useGetUserQuery } from "@/redux/services";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

function FeaturedPlaces() {
  const supabase = createClientComponentClient<Database>();
  const userSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.user;
  };
  // const user = userSession()
  const { currentData } = useGetUserQuery("");
  console.log(currentData, "fffff");
  return (
    <figure className="flex overflow-x-scroll px-5 py-10 gap-x-3">
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
    </figure>
  );
}

export default FeaturedPlaces;
