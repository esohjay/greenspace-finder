"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFeatures,
  selectFeatures,
  selectMapCenter,
  selectMapExtent,
  selectFeatureCount,
  selectFeatureStartIndex,
} from "@/redux/features/mapSlice";
import useMapUtils from "@/hooks/useMapUtils";
import Place from "@/components/place";
import { useIntersection } from "@/hooks/useInfiteLoader";

export default function Items() {
  const features = useAppSelector(selectFeatures);
  const sentryRef = useRef<HTMLDivElement>(null!);
  const startIndex = useAppSelector(selectFeatureStartIndex);
  const count = useAppSelector(selectFeatureCount);
  const dispatch = useAppDispatch();
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getFeatures, createGraphicsAndFeatures } = useMapUtils();

  const lastItem = useIntersection(sentryRef, "0px");
  useEffect(() => {
    if (lastItem) {
    }
  });
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
