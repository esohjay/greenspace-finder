"use client";
import React, { useState, useEffect } from "react";
import useFetchFeatures from "@/hooks/useFetchFeatures";
import Place from "@/components/place";
import Loader from "@/components/loader";
import { GeoJSONFeatureCollection } from "@/types/features";
import { useAppSelector } from "@/redux/hooks";
import { selectStatus } from "@/redux/features/mapSlice";
import { Profile } from "@/types/user";

function SavedPlaces({ user }: { user: Profile }) {
  const { getSavedFeatures, getSingleFeature } = useFetchFeatures();
  const status = useAppSelector(selectStatus);

  const [savedPlaces, setSavedPlaces] =
    useState<GeoJSONFeatureCollection | null>(null);

  useEffect(() => {
    const getFeature = async () => {
      const savedPlacesDB = user.saved_places?.split("|");
      console.log(savedPlacesDB);
      if (savedPlacesDB && savedPlacesDB.length > 0) {
        const filteredId = savedPlacesDB.filter((place) => place !== "");
        if (filteredId && filteredId.length > 1) {
          const feature = await getSavedFeatures(filteredId);
          setSavedPlaces(feature);
        } else {
          const feature = await getSingleFeature(filteredId[0]);
          setSavedPlaces(feature);
        }
      }
    };
    if (!savedPlaces) {
      getFeature();
    }
  }, [savedPlaces, getSavedFeatures, user.saved_places, getSingleFeature]);
  console.log(savedPlaces);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
      {savedPlaces &&
      savedPlaces.features.length &&
      savedPlaces?.features.length > 0 ? (
        savedPlaces.features?.map((savedPlace) => (
          <Place
            key={savedPlace.properties.OBJECTID}
            isDistance={false}
            feature={savedPlace}
          />
        ))
      ) : (
        <p className="p-2 font-semibold text-secondaryColor">
          No saved greenspace
        </p>
      )}

      {/* {status === "loading" && savedPlaces && <Loader text="Please wait..." />} */}
    </section>
  );
}

export default SavedPlaces;
