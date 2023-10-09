"use client";
import React, { useEffect, useState } from "react";
import CircleImage from "../circleImage";
import useGetExtent from "@/hooks/useGetExtent";
import useMapUtils from "@/hooks/useMapUtils";
import useFetch from "@/hooks/useFetch";
import { useGetUserQuery } from "@/redux/services";
import { Profile } from "@/types/user";
import { useAppSelector } from "@/redux/hooks";
import { selectFeatures } from "@/redux/features/mapSlice";
import Place from "@/components/place";

function FeaturedPlaces({ user }: { user: Profile }) {
  const { getGeoJSONFeatures } = useMapUtils();
  const features = useAppSelector(selectFeatures);
  const userId = user.id!;
  // const { currentData } = useGetUserQuery(userId);
  const lat = user.latitude!;
  const long = user.longitude!;
  const unit = user.unit! as __esri.LinearUnits;
  const distance = user.search_radius!;
  // console.log(currentData, "fffff");
  const { mapCenter, mapExtent } = useGetExtent({
    pointCoordinates: { lat, long },
    unit,
    distance,
  });
  useEffect(() => {
    if (mapExtent) {
      getGeoJSONFeatures(mapExtent, mapCenter, null);
    }
  }, []);

  return (
    <figure className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, i) => {
        if (i > 3) {
          return;
        }
        return <Place key={feature.properties.OBJECTID} feature={feature} />;
      })}
      {/* <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" /> */}
    </figure>
  );
}

export default FeaturedPlaces;
