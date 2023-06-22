"use client";
import React, { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/light/main.css";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
};

function MapDisplay({ mapOptions }: MapDisplayProps) {
  const mapDiv = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map(mapOptions);
        const view = new MapView({
          container: mapDiv.current,
          map,
          zoom: 5,
          center: [-0.09, 51.505],
        });
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
  //   useEffect(() => {
  //     if (mapDiv.current) {
  //       const map = new Map({
  //         basemap: "streets-vector",
  //       });
  //       const view = new MapView({
  //         map,
  //         container: "viewDiv", //mapDiv.current,
  //         zoom: 4,
  //         center: [51.505, -0.09],
  //       });
  //       view.when(() => {
  //         console.log("Map is loaded");
  //       });
  //     }
  //   }, []);
  return (
    <div
      id="viewDiv"
      ref={mapDiv}
      style={{ height: "100vh", width: "100%" }}
    ></div>
  );
}

export default MapDisplay;
