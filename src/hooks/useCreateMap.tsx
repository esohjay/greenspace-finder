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

type CreateMapProps = {
  elemntId: string;
  mapOptions: __esri.MapProperties;
};

function useCreateMap(elemntId: string) {
  const viewRef = useRef<MapView>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeMap = async (id: string) => {
      const map = new Map({
        basemap: "streets",
      });
      viewRef.current = new MapView({
        container: id, //mapDiv.current,
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
    };
    initializeMap(elemntId);
    return viewRef?.current?.destroy();
  }, [elemntId]);
}

export default useCreateMap;
