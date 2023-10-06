"use client";
import React, { useEffect } from "react";
import CircleImage from "../circleImage";
import useGetExtent from "@/hooks/useGetExtent";
import useFetch from "@/hooks/useFetch";
import { useGetUserQuery } from "@/redux/services";
import { Profile } from "@/types/user";

function FeaturedPlaces({ user }: { user: Profile }) {
  const userId = user.id!;
  const { currentData } = useGetUserQuery(userId);
  const lat = user.latitude!;
  const long = user.longitude!;
  const unit = user.unit! as __esri.LinearUnits;
  const distance = user.search_radius!;
  console.log(currentData, "fffff");
  const extent = useGetExtent({
    pointCoordinates: { lat, long },
    unit,
    distance,
  });
  // console.log(extent?.toJSON());
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
