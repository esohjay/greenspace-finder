"use client";
import React, { useState, useEffect } from "react";
import useFetchFeatures from "@/hooks/useFetchFeatures";
import Place from "@/components/place";
import Loader from "@/components/loader";
import { GeoJSONFeatureCollection } from "@/types/features";
import { useAppSelector } from "@/redux/hooks";
import { selectStatus } from "@/redux/features/mapSlice";

function SavedPlaces() {
  const { getSavedFeatures } = useFetchFeatures();
  const status = useAppSelector(selectStatus);

  const [savedPlaces, setSavedPlaces] =
    useState<GeoJSONFeatureCollection | null>(null);

  useEffect(() => {
    const getFeature = async () => {
      const feature = await getSavedFeatures([
        "11457",
        "11450",
        "10353",
        "2215",
      ]);
      setSavedPlaces(feature);
    };
    if (!savedPlaces) {
      getFeature();
    }
  }, [savedPlaces, getSavedFeatures]);
  console.log(savedPlaces);

  return (
    <section>
      {savedPlaces &&
      savedPlaces.features.length &&
      savedPlaces?.features.length > 0 ? (
        savedPlaces.features?.map((savedPlace) => (
          <Place key={savedPlace.properties.OBJECTID} feature={savedPlace} />
        ))
      ) : (
        <p>No Facility nearby</p>
      )}

      {status === "loading" && savedPlaces && <Loader text="Please wait..." />}
    </section>
  );
}

export default SavedPlaces;
