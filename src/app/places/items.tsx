"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import {
  selectFeatures,
  selectHasNext,
  selectStatus,
} from "@/redux/features/mapSlice";
import useMapUtils from "@/hooks/useMapUtils";
import Place from "@/components/place";
import { useIntersection } from "@/hooks/useInfiteLoader";
import Loader from "@/components/loader";
import { Profile } from "@/types/user";
import getExtent from "@/lib/getExtent";
import Placeholder from "@/components/placeholder";
import { selectFeatureTypes } from "@/redux/features/mapSlice";
import { useRouter } from "next/navigation";

export default function Items({ user }: { user: Profile }) {
  const lat = user.latitude!;
  const long = user.longitude!;
  const unit = user.unit! as __esri.LinearUnits;
  const distance = user.search_radius!;

  const searchParams = useSearchParams();
  const features = useAppSelector(selectFeatures);
  const hasNext = useAppSelector(selectHasNext);
  const status = useAppSelector(selectStatus);
  const sentryRef = useRef<HTMLDivElement>(null!);
  const featureTypes = useAppSelector(selectFeatureTypes);
  const [center, setMapCenter] = useState<__esri.Point | null>(null);
  const [extent, setExtent] = useState<__esri.Extent | null>(null);
  const router = useRouter();
  const { getGeoJSONFeatures } = useMapUtils();

  const lastItem = useIntersection(sentryRef, "0px");
  useEffect(() => {
    if (!user.latitude || !user.longitude) {
      router.push("/location");
    } else {
      const { mapCenter, mapExtent } = getExtent({
        pointCoordinates: { lat, long },
        unit,
        distance,
      });
      if (mapCenter && mapExtent) {
      }
      setExtent(mapExtent);
      setMapCenter(mapCenter);
    }
  }, [router, user, distance, lat, long, unit]);
  useEffect(() => {
    if (
      (lastItem && hasNext && center && extent) ||
      (!features.length && lastItem && center && extent)
    ) {
      getGeoJSONFeatures(extent, center, searchParams.get("type"));
    }
  }, [lastItem, extent, center]);
  console.log(featureTypes);
  console.log(status, features.length, features);
  return (
    <section>
      <section className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {features && features?.length > 0
          ? features?.map((feature) => (
              <Place
                key={feature.properties.OBJECTID}
                isDistance={true}
                feature={feature}
              />
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
