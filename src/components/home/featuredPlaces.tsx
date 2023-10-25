"use client";
import React, { useEffect, useState } from "react";
import getExtent from "@/lib/getExtent";
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
  const [center, setMapCenter] = useState<__esri.Point | null>(null);
  const [extent, setExtent] = useState<__esri.Extent | null>(null);
  const router = useRouter();
  const lat = user.latitude!;
  const long = user.longitude!;
  const unit = user.unit! as __esri.LinearUnits;
  const distance = user.search_radius!;
  // console.log(currentData, "fffff");

  useEffect(() => {
    if (!user.latitude || !user.longitude) {
      router.push("/location");
    } else {
      const { mapCenter, mapExtent } = getExtent({
        pointCoordinates: { lat, long },
        unit,
        distance,
      });
      setExtent(mapExtent);
      setMapCenter(mapCenter);
    }
  }, [router, user, distance, lat, long, unit]);
  useEffect(() => {
    if (extent && center) {
      getGeoJSONFeatures(extent, center, null);
    }
  }, [center, extent]);
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <figure className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features && features?.length > 0
        ? features.map((feature, i) => {
            if (i > 3) {
              return;
            }
            return (
              <Place
                key={feature.properties.OBJECTID}
                isDistance={true}
                feature={feature}
              />
            );
          })
        : Array(4)
            .fill("")
            .map((_, i) => <Placeholder key={i} />)}
    </figure>
  );
}

export default FeaturedPlaces;
