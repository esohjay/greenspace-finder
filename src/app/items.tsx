"use client";
import React from "react";
import Image from "next/image";
import { selectMapFeatures } from "@/redux/features/mapSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getAllFeatures,
  selectMapCenter,
  selectMapExtent,
} from "@/redux/features/mapSlice";
import useMapUtils from "@/hooks/useMapUtils";

export default function Items() {
  const features = useAppSelector(selectMapFeatures);
  const dispatch = useAppDispatch();
  const center = useAppSelector(selectMapCenter)!;
  const extent = useAppSelector(selectMapExtent)!;
  const { getFeatures, addGraphicsToMap } = useMapUtils();
  const findAll = () => {};
  const findByExt = async () => {
    const feat = await getFeatures(extent, "0");
    addGraphicsToMap(feat, center);
  };

  console.log(features);
  return (
    <section>
      <button onClick={findAll}>search here</button>
      <button onClick={findByExt}>search extent</button>
      {features && features?.features?.length > 0 ? (
        features?.features.map((feature) => (
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
                  <dt className="sr-only">Price</dt>

                  <dd className="text-sm text-gray-500">$240,000</dd>
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
