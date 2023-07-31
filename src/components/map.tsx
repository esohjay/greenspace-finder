"use client";
import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import WFSLayer from "@arcgis/core/layers/WFSLayer";
import Graphic from "@arcgis/core/Graphic";
import esriRequest from "@arcgis/core/request";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { getUrl, getFeatures } from "@/lib/mapUtils";

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
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({ ...mapOptions });
        const view = new MapView({
          container: "viewDiv", //mapDiv.current,
          map,
          zoom: 10,
          center: [-0.09, 51.505],

          constraints: {
            minZoom: 7,
            maxZoom: 20,
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
  reactiveUtils.watch(
    // getValue function
    () => mapV?.ready,
    // callback
    async (updating) => {
      const v = mapV?.extent!;
      const ft = await getFeatures(v);
      console.log(ft);
    }
  );
  console.log(mapV?.extent, "3");
  console.log(viewRef.current);
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
