"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectFeatures,
  selectMapCenter,
  selectMapExtent,
  selectHasNext,
} from "@/redux/features/mapSlice";
import useMapUtils from "@/hooks/useMapUtils";
import Place from "@/components/place";
import { useIntersection } from "@/hooks/useInfiteLoader";

export default function Items() {
  const features = useAppSelector(selectFeatures);
  const hasNext = useAppSelector(selectHasNext);
  const sentryRef = useRef<HTMLDivElement>(null!);
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getGeoJSONFeatures } = useMapUtils();

  const lastItem = useIntersection(sentryRef, "0px");
  useEffect(() => {
    if (lastItem && hasNext) {
      getGeoJSONFeatures(extent, center);
    }
  }, [center, extent, lastItem, getGeoJSONFeatures, hasNext]);
  console.log(lastItem);
  return (
    <section>
      {features && features?.length > 0 ? (
        features?.map((feature) => (
          <Place key={feature.properties.OBJECTID} feature={feature} />
        ))
      ) : (
        <p>No Facility nearby</p>
      )}
      <div ref={sentryRef}></div>
    </section>
  );
}
