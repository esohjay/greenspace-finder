"use client";
import React from "react";
import CircleImage from "../circleImage";
import useGetExtent from "@/hooks/useGetExtent";
import useFetch from "@/hooks/useFetch";
import { useGetUserQuery } from "@/redux/services";

function FeaturedPlaces() {
  const { currentData } = useGetUserQuery(null);
  console.log(currentData);
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
