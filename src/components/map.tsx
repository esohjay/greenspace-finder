"use client";
import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { getFeatures, createPolygon } from "@/lib/mapUtils";
import { setMapFeatures } from "@/redux/features/mapSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
  view?: MapView;
  map?: Map;
  // layer?: FeatureLayer;
  savedExtent?: any;
};

function MapDisplay({ mapOptions }: MapDisplayProps) {
  const mapDiv = useRef<HTMLDivElement>(null!);
  const [mapV, setMapV] = useState<MapView>();
  const viewRef = useRef<__esri.MapView>();
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({ ...mapOptions });
        const view = new MapView({
          container: "viewDiv", //mapDiv.current,
          map,
          zoom: 13,
          center: [-2.415471, 53.577839],

          constraints: {
            minZoom: 7,
            maxZoom: 20,
            rotationEnabled: false,
          },
        });
        setMapV(view);
        viewRef.current = view;
        let center = map.get("center");
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
  reactiveUtils.watch(
    // getValue function
    () => mapV?.ready && mapV.stationary,
    // callback
    async (updating) => {
      const mapExtent = mapV?.extent!;
      // const center = mapV?.extent.center!;
      const features = await getFeatures(mapExtent);
      dispatch(setMapFeatures(features));
      if (features.features.length > 0) {
        const graphics = features.features.map((feature) =>
          createPolygon(feature)
        );
        mapV?.graphics?.removeAll();
        mapV?.graphics?.addMany(graphics);
      }
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
