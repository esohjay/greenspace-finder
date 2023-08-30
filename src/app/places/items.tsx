"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
  const features = useAppSelector(selectFeatures);
  const hasNext = useAppSelector(selectHasNext);
  // const status = useAppSelector(selectStatus);
  const sentryRef = useRef<HTMLDivElement>(null!);
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getGeoJSONFeatures } = useMapUtils();

  const lastItem = useIntersection(sentryRef, "0px");
  useEffect(() => {
    if (!features.length) {
      getGeoJSONFeatures(extent, center);
    }
  }, []);

  useEffect(() => {
    if (lastItem && hasNext) {
      getGeoJSONFeatures(extent, center);
    }
  }, []);

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
      {/* {status === "loading" && features && <Loader text="Please wait..." />} */}
    </section>
  );
}
