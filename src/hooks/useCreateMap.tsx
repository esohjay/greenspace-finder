"use client";
import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { setCenter, setExtent } from "@/redux/features/mapSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setMapCenterCoordinate } from "@/redux/features/mapSlice";

type useCreateMapProps = {
  mapOptions: __esri.MapProperties;
  viewOptions: __esri.MapViewProperties;
};

function useCreateMap({ mapOptions, viewOptions }: useCreateMapProps) {
  const [mapView, setMapView] = useState<MapView>();
  const [map, setMap] = useState<Map>();
  const viewRef = useRef<MapView>();
  const mapRef = useRef<Map>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({ ...mapOptions });
        const view = new MapView({
          map,
          ...viewOptions,
        });
        view.on("click", function (event) {
          // event is the event handle returned after the event fires.
          const { x, y } = event.mapPoint;
          if (x && y) {
            dispatch(setMapCenterCoordinate({ lat: y, long: x }));
          }
        });
        // setMapView(view);
        viewRef.current = view;
        mapRef.current = map;
        // console.log(viewRef.current, 'refview');
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
  }, [mapOptions, viewOptions, dispatch]);

  reactiveUtils.when(
    // getValue function
    () => viewRef.current?.ready,
    // callback
    async (uu) => {
      console.log(viewRef.current?.extent.toJSON());
      // const mapExtent = mapView?.extent!;
      // const mapCenter = mapView?.center!;
      // dispatch(setExtent(mapExtent.toJSON()));
      // dispatch(setCenter(mapCenter.toJSON()));
    }
  );
  return { mapView, mapRef, viewRef };
}

export default useCreateMap;
