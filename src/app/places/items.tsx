"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFeatures,
  selectFeatures,
  selectMapCenter,
  selectMapExtent,
} from "@/redux/features/mapSlice";
import useInfiniteScroll from "react-infinite-scroll-hook";
import useMapUtils from "@/hooks/useMapUtils";
import Place from "@/components/place";

export default function Items() {
  const features = useAppSelector(selectFeatures);
  const dispatch = useAppDispatch();
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getFeatures, addGraphicsToMap } = useMapUtils();
  const loadMore = () => {
    console.log("load");
  };

  const [sentryRef] = useInfiniteScroll({
    loading: true,
    hasNextPage: true,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    // disabled: false,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    // rootMargin: '0px 0px 400px 0px',
  });
  return (
    <section>
      {features && features?.length > 0 ? (
        features?.map((feature) => (
          <Place key={feature.properties.OBJECTID} feature={feature} />
        ))
      ) : (
        <p>No Facility nearby</p>
      )}
      <div ref={sentryRef}>kkk</div>
    </section>
  );
}
