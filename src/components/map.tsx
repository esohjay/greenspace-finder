"use client";
import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";

import "@arcgis/core/assets/esri/themes/light/main.css";
import useMapUtils from "@/hooks/useMapUtils";
import {
  createPolygon,
  calculateDistance,
  getFeatures as getFeaturess,
} from "@/lib/mapUtils";
import {
  selectFeatures,
  selectMapCenter,
  selectMapExtent,
  setCenter,
  setExtent,
  selectFeatureCount,
  selectFeatureStartIndex,
  setFeatureStartIndex,
} from "@/redux/features/mapSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GeoJSONFeature, GeoJSONFeatureCollection } from "@/types/features";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
  view?: MapView;
  map?: Map;
};

function MapDisplay({ mapOptions }: MapDisplayProps) {
  const mapDiv = useRef<HTMLDivElement>(null!);
  const [mapV, setMapV] = useState<MapView>();
  const viewRef = useRef<__esri.MapView>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const { addGraphicsToMap, getMapFeatures, getFeatures } = useMapUtils();
  const features = useAppSelector(selectFeatures);
  const startIndex = useAppSelector(selectFeatureStartIndex);
  const count = useAppSelector(selectFeatureCount);
  // const center = useAppSelector(selectMapCenter);
  // const ext = useAppSelector(selectMapExtent);
  // console.log(center, ext);
  console.log(features);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({ ...mapOptions });
        const view = new MapView({
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
        setMapV(view);
        viewRef.current = view;

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

  const a = <button ref={buttonRef}>load more</button>;
  // Create a button element

  reactiveUtils.watch(
    // getValue function
    () => mapV?.ready,
    // callback
    async (updating) => {
      const mapExtent = mapV?.extent!;
      const mapCenter = mapV?.center!;
      dispatch(setExtent(mapExtent.toJSON()));
      dispatch(setCenter(mapCenter.toJSON()));

      const features = await getFeatures(mapExtent, `${startIndex}`);
      dispatch(setFeatureStartIndex(startIndex + count));
      if (features && features.features.length > 0) {
        const { graphics } = addGraphicsToMap(features, mapCenter);
        mapV?.graphics?.removeAll();
        mapV?.graphics?.addMany(graphics);
        // dispatch(setMapFeatures(featureCollection));
      }
      const button = document.createElement("button");
      button.textContent = "Search here";
      button.classList.add("map-button");
      button.addEventListener("click", async () => {
        const mapExtent = mapV?.extent!;
        const mapCenter = mapV?.center!;
        const features = await getFeatures(mapExtent, `${startIndex}`);
        dispatch(setFeatureStartIndex(startIndex + count));
        const { graphics } = addGraphicsToMap(features, mapCenter);
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
