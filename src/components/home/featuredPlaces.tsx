"use client";
import React, { useEffect } from "react";
import useGetExtent from "@/hooks/useGetExtent";
import useMapUtils from "@/hooks/useMapUtils";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/user";
import { useAppSelector } from "@/redux/hooks";
import { selectFeatures } from "@/redux/features/mapSlice";
import Place from "@/components/place";
import Placeholder from "../placeholder";

function FeaturedPlaces({ user }: { user: Profile }) {
  const { getGeoJSONFeatures } = useMapUtils();
  const features = useAppSelector(selectFeatures);
  const router = useRouter();
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
    if (!user.latitude || !user.longitude) {
      router.push("/location");
    }
  }, [router, user]);
  useEffect(() => {
    if (mapExtent) {
      getGeoJSONFeatures(mapExtent, mapCenter, null);
    }
  }, []);

  return (
    <figure className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features && features?.length > 0
        ? features.map((feature, i) => {
            if (i > 3) {
              return;
            }
            return (
              <Place key={feature.properties.OBJECTID} feature={feature} />
            );
          })
        : Array(4)
            .fill("")
            .map((_, i) => <Placeholder key={i} />)}
    </figure>
  );
}

export default FeaturedPlaces;
