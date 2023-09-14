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

export default function Items() {
  const searchParams = useSearchParams();
  const features = useAppSelector(selectFeatures);
  const hasNext = useAppSelector(selectHasNext);
  const status = useAppSelector(selectStatus);
  const sentryRef = useRef<HTMLDivElement>(null!);
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getGeoJSONFeatures } = useMapUtils();

  const lastItem = useIntersection(sentryRef, "0px");

  useEffect(() => {
    if ((lastItem && hasNext) || (!features.length && lastItem)) {
      getGeoJSONFeatures(extent, center, searchParams.get("type"));
    }
  }, [lastItem]);

  console.log(lastItem, features.length);
  return (
    <section>
      {features && features?.length > 0 ? (
        features?.map((feature) => (
          <Place key={feature.properties.OBJECTID} feature={feature} />
        ))
      ) : (
        <p>No Facility nearby</p>
      )}
      {features && <div ref={sentryRef}></div>}
      {status === "loading" && features && <Loader text="Please wait..." />}
    </section>
  );
}
