"use client";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import {
  selectFeatures,
  selectMapCenter,
  selectMapExtent,
  selectHasNext,
  selectStatus,
} from "@/redux/features/mapSlice";
import useMapUtils from "@/hooks/useMapUtils";
import Place from "@/components/place";
import { useIntersection } from "@/hooks/useInfiteLoader";
import Loader from "@/components/loader";
import { Profile } from "@/types/user";
import useGetExtent from "@/hooks/useGetExtent";
import Placeholder from "@/components/placeholder";
import { selectFeatureTypes } from "@/redux/features/mapSlice";

export default function Items({ user }: { user: Profile }) {
  const userId = user.id!;
  const lat = user.latitude!;
  const long = user.longitude!;
  const unit = user.unit! as __esri.LinearUnits;
  const distance = user.search_radius!;
  const { mapCenter, mapExtent } = useGetExtent({
    pointCoordinates: { lat, long },
    unit,
    distance,
  });
  const searchParams = useSearchParams();
  const features = useAppSelector(selectFeatures);
  const hasNext = useAppSelector(selectHasNext);
  const status = useAppSelector(selectStatus);
  const sentryRef = useRef<HTMLDivElement>(null!);
  const featureTypes = useAppSelector(selectFeatureTypes);
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getGeoJSONFeatures } = useMapUtils();

  const lastItem = useIntersection(sentryRef, "0px");

  useEffect(() => {
    if ((lastItem && hasNext) || (!features.length && lastItem)) {
      getGeoJSONFeatures(mapExtent, mapCenter, searchParams.get("type"));
    }
  }, [lastItem]);
  console.log(featureTypes);
  console.log(status, features.length, features);
  return (
    <section>
      <section className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {features && features?.length > 0
          ? features?.map((feature) => (
              <Place key={feature.properties.OBJECTID} feature={feature} />
            ))
          : Array(4)
              .fill("")
              .map((_, i) => <Placeholder key={i} />)}
      </section>
      {features && <div ref={sentryRef}></div>}
      <div className="grid place-items-center">
        {status === "loading" && features && <Loader text="Please wait..." />}
      </div>
    </section>
  );
}
