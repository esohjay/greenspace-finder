"use client";
import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

import "@arcgis/core/assets/esri/themes/light/main.css";
import useMapUtils from "@/hooks/useMapUtils";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { selectFeatureStartIndex } from "@/redux/features/mapSlice";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { GeoJSONFeature } from "@/types/features";
import {
  selectMapCenterCoordinates,
  setMapCenterCoordinate,
} from "@/redux/features/mapSlice";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
};

function LocationMap({ mapOptions }: MapDisplayProps) {
  const dispatch = useAppDispatch();
  const userCoordinates = useAppSelector(selectMapCenterCoordinates);
  const mapDiv = useRef<HTMLDivElement>(null!);
  const graphicsLayerRef = useRef<__esri.GraphicsLayer | null>(null);
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
        view.on("click", function (event) {
          // event is the event handle returned after the event fires.
          const { x, y } = event.mapPoint;
          if (x && y) {
            dispatch(setMapCenterCoordinate({ lat: y, long: x }));
          }
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
  }, [mapOptions, dispatch]);

  useEffect(() => {
    if (userCoordinates) {
      // Create a graphic (pin) at the clicked point
      const point = new Point({
        y: userCoordinates.lat,
        x: userCoordinates.long,
        spatialReference: { wkid: 3857 },
      });
      // go to the given point
      const mapView = mapV!;
      mapView.center = point;
      // Create a GraphicsLayer to display the pin
      const graphicsLayer = new GraphicsLayer();
      mapV?.map.add(graphicsLayer);
      const pinSymbol = {
        type: "simple-marker",
        style: "circle",
        color: "blue",
        size: "16px", // Adjust the size as needed
        outline: {
          color: "white",
          width: 2,
        },
      };

      const graphic = new Graphic({
        geometry: point,
        symbol: pinSymbol,
      });

      // Clear previous pins and add the new one to the GraphicsLayer
      graphicsLayer.removeAll();
      graphicsLayer.add(graphic);
      // Store the graphicsLayer in the ref for later use (e.g., to clear pins)
      graphicsLayerRef.current = graphicsLayer;
    }
  }, [userCoordinates, mapV]);

  //   reactiveUtils.when(
  //     // getValue function
  //     () => mapV?.ready,
  //     // callback
  //     async (updating) => {
  //       const graphic = createPolygon(feature);

  //       //get the coordinates of the feature graphics (polygon feature)
  //       const rings = graphic.geometry.toJSON().rings;
  //       //create a new polygon using the coordinates of the graphics
  //       const polygon = new Polygon({
  //         hasZ: true,
  //         hasM: true,
  //         rings: rings,
  //         spatialReference: { wkid: 3857 },
  //       });
  //       //get the center point of the new polygon
  //       const longitude = polygon.centroid?.x!;
  //       const latitude = polygon.centroid?.y!;
  //       //to polygon center
  //       const point = new Point({
  //         x: longitude,
  //         y: latitude,
  //         spatialReference: { wkid: 3857 },
  //       });
  //       const center = mapV!;
  //       center.goTo(point);
  //       mapV?.graphics?.add(graphic);
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

export default LocationMap;
