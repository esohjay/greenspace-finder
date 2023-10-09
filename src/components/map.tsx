"use client";
import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

import "@arcgis/core/assets/esri/themes/light/main.css";
import useMapUtils from "@/hooks/useMapUtils";
import useFetchFeatures from "@/hooks/useFetchFeatures";
import {
  selectFeatures,
  setCenter,
  setExtent,
  selectFeatureCount,
  selectFeatureStartIndex,
} from "@/redux/features/mapSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
  coordinates: [number, number];
};

function MapDisplay({ mapOptions, coordinates }: MapDisplayProps) {
  const mapDiv = useRef<HTMLDivElement>(null!);
  const [mapV, setMapV] = useState<MapView>();
  const viewRef = useRef<MapView>();
  const dispatch = useAppDispatch();
  const { createGraphicsAndFeatures, getGeoJSONFeatures } = useMapUtils();
  const { getFeatures } = useFetchFeatures();
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({ ...mapOptions });
        const view = new MapView({
          container: "viewDiv", //mapDiv.current,
          map,
          zoom: 12,
          center: coordinates, //[-2.415471, 53.577839],
          spatialReference: { wkid: 3857 },
          constraints: {
            minZoom: 7,
            // maxZoom: 20,
            rotationEnabled: false,
          },
        });
        setMapV(view);
        // viewRef.current = view;

        // Clean up the map and view when the component is unmounted
        return () => {
          if (view) {
            view.destroy();
          }
          if (map) {
            map.destroy();
          }
        };
      } catch (error) {
        console.error("Error initializing the map:", error);
      }
    };
    initializeMap();
  }, [mapOptions]);
  console.log(viewRef);
  // Create a button element

  reactiveUtils.when(
    // getValue function
    () => mapV?.ready,
    // callback
    async (updating) => {
      const mapExtent = mapV?.extent!;
      const mapCenter = mapV?.center!;
      dispatch(setExtent(mapExtent.toJSON()));
      dispatch(setCenter(mapCenter.toJSON()));
      const features = await getFeatures({
        extent: mapExtent,
        type: null,
        isMap: true,
      });
      console.log(features);
      // dispatch(setFeatureStartIndex(startIndex + count));
      const { graphics } = createGraphicsAndFeatures(features, mapCenter);
      // const graphics = await getGeoJSONFeatures(mapExtent, mapCenter);
      mapV?.graphics?.removeAll();
      mapV?.graphics?.addMany(graphics);
      const button = document.createElement("button");
      button.textContent = "Search here";
      button.classList.add("map-button");
      button.addEventListener("click", async () => {
        const mapExtent = mapV?.extent!;
        const mapCenter = mapV?.center!;
        const features = await getFeatures({
          extent: mapExtent,
          type: null,
          isMap: true,
        });
        // dispatch(setFeatureStartIndex(startIndex + count));
        const { graphics } = createGraphicsAndFeatures(features, mapCenter);
        mapV?.graphics?.removeAll();
        mapV?.graphics?.addMany(graphics);
        // dispatch(setMapFeatures(featureCollection));
      });
      // Add the button to the view's UI
      mapV?.ui.add(button, "bottom-trailing");
    }
  );

  return (
    <div
      id="viewDiv"
      ref={mapDiv}
      //   style={{ height: "100vh", width: "100%" }}
      className="w-full h-full"
    ></div>
  );
}

export default MapDisplay;
