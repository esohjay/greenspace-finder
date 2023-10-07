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
  const { currentData } = useGetUserQuery(userId);
  const lat = user.latitude!;
  const long = user.longitude!;
  const unit = user.unit! as __esri.LinearUnits;
  const distance = user.search_radius!;
  console.log(currentData, "fffff");
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
  console.log(features, "featured place");
  // console.log(extent?.toJSON());
  return (
    <figure className="flex overflow-x-scroll px-5 py-10 gap-x-3">
      {features.map((feature) => (
        // <CircleImage
        //   key={feature.properties.OBJECTID}
        //   text={feature.properties.Type}
        //   src="/images/ugs-with-fam.jpg"
        // />
        <Place key={feature.properties.OBJECTID} feature={feature} />
      ))}
      {/* <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      <CircleImage text="places" src="/images/ugs-with-fam.jpg" /> */}
    </figure>
  );
}

export default FeaturedPlaces;
