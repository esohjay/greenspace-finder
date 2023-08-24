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
import useMapUtils from "@/hooks/useMapUtils";

export default function Items() {
  const features = useAppSelector(selectFeatures);
  const dispatch = useAppDispatch();
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getFeatures, addGraphicsToMap } = useMapUtils();
  // useEffect(() => {
  //   if (center && extent) {
  //     const requestFeatures = async () => {
  //       const feat = await getFeatures(extent, "0");
  //       console.log(feat, center);
  //       if (feat && feat.features.length > 0) {
  //         const {  } = addGraphicsToMap(feat, center);
  //         const j = () => {
  //           return [...featureCollection.features]
  //         }
  //         dispatch(setFeatures(featureCollection));
  //         console.log(featureCollection);
  //       }
  //     };
  //     requestFeatures();
  //   }
  // }, [center, extent]);
  return (
    <section>
      {features && features?.length > 0 ? (
        features?.map((feature) => (
          <a
            href="#"
            key={feature.properties.OBJECTID}
            className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
          >
            <Image
              alt="Home"
              width={200}
              height={200}
              src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dt className="sr-only">Distance</dt>

                  <dd className="text-sm text-gray-500">
                    {feature.properties.distance}km away
                  </dd>
                </div>

                <div>
                  <dt className="sr-only">Address</dt>

                  <dd className="font-medium">{feature.properties.Type}</dd>
                </div>
              </dl>
            </div>
          </a>
        ))
      ) : (
        <p>No Facility nearby</p>
      )}
    </section>
  );
}
