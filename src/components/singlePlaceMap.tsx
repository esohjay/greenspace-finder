"use client";
import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

import "@arcgis/core/assets/esri/themes/light/main.css";
import useMapUtils from "@/hooks/useMapUtils";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
import { selectFeatureStartIndex } from "@/redux/features/mapSlice";

import { useAppSelector } from "@/redux/hooks";
import { GeoJSONFeature } from "@/types/features";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
  feature: GeoJSONFeature;
};

function SingleMapDisplay({ mapOptions, feature }: MapDisplayProps) {
  const mapDiv = useRef<HTMLDivElement>(null!);
  const [mapV, setMapV] = useState<MapView>();
  const { createPolygon } = useMapUtils();
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({ ...mapOptions });
        const view = new MapView({
          container: mapDiv.current,
          map,
          zoom: 15,
          center: [-2.415471, 53.577839],
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

  reactiveUtils.when(
    // getValue function
    () => mapV?.ready,
    // callback
    async (updating) => {
      const gr = createPolygon(feature);

      //get the coordinates of the feature graphics (polygon feature)
      const rings = gr.geometry.toJSON().rings;
      //create a new polygon using the coordinates of the graphics
      const polygon = new Polygon({
        hasZ: true,
        hasM: true,
        rings: rings,
        spatialReference: { wkid: 3857 },
      });
      //get the center point of the new polygon
      const longitude = polygon.centroid?.x!;
      const latitude = polygon.centroid?.y!;
      //to polygon center
      const point = new Point({
        x: longitude,
        y: latitude,
        spatialReference: { wkid: 3857 },
      });
      const center = mapV!;
      center.goTo(point);
      mapV?.graphics?.add(gr);
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

export default SingleMapDisplay;
