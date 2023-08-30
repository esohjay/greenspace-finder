"use client";
import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

import "@arcgis/core/assets/esri/themes/light/main.css";
import useMapUtils from "@/hooks/useMapUtils";
import {
  selectFeatures,
  setCenter,
  setExtent,
} from "@/redux/features/mapSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
};

function MapDisplay({ mapOptions }: MapDisplayProps) {
  const mapDiv = useRef<HTMLDivElement>(null!);
  const [mapV, setMapV] = useState<MapView>();
  const viewRef = useRef<MapView>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const f = useAppSelector(selectFeatures);
  const { createGraphicsAndFeatures, getFeatures, getGeoJSONFeatures } =
    useMapUtils();
  // const startIndex = useAppSelector(selectFeatureStartIndex);
  // const count = useAppSelector(selectFeatureCount);
  console.log(f.length);
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({ ...mapOptions });
        viewRef.current = new MapView({
          container: "viewDiv", //mapDiv.current,
          map,
          zoom: 12,
          center: [-2.415471, 53.577839],
          spatialReference: { wkid: 3857 },
          constraints: {
            minZoom: 7,
            // maxZoom: 20,
            rotationEnabled: false,
          },
        });
        // setMapV(view);

        // dispatch(setExtent(view.extent.toJSON()));
        // dispatch(setCenter(view.center.toJSON()));
        // viewRef.current = view;

        // Clean up the map and view when the component is unmounted
        return () => {
          if (viewRef.current) {
            viewRef.current.destroy();
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

  console.log("lllll");
  // Create a button element
  const someFunction = async () => {
    const a = await reactiveUtils.whenOnce(() => viewRef.current?.ready);
    console.log("LayerView is no longer updating");
  };
  //   reactiveUtils.when(
  //     // getValue function
  //     () => mapV?.ready && mapV?.stationary,
  //     // callback
  //     async (updating) => {
  //       const mapExtent = mapV?.extent!;
  //       console.log("lllll");
  //       const mapCenter = mapV?.center!;

  //       const graphics = await getGeoJSONFeatures(mapExtent, mapCenter);
  //       mapV?.graphics?.removeAll();
  //       mapV?.graphics?.addMany(graphics);
  //       // const button = document.createElement("button");
  //       // button.textContent = "Search here";
  //       // button.classList.add("map-button");
  //       // button.addEventListener("click", async () => {
  //       //   const mapExtent = mapV?.extent!;
  //       //   const mapCenter = mapV?.center!;
  //       //   const features = await getFeatures(mapExtent, `${startIndex}`);
  //       //   dispatch(setFeatureStartIndex(startIndex + count));
  //       //   const { graphics } = createGraphicsAndFeatures(features, mapCenter);
  //       //   mapV?.graphics?.removeAll();
  //       //   mapV?.graphics?.addMany(graphics);
  //       //   // dispatch(setMapFeatures(featureCollection));
  //       // });
  //       // Add the button to the viewRef.current's UI
  //       // mapV?.ui.add(button, "bottom-trailing");
  //     }
  //   );

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
