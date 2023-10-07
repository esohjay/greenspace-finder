import React from "react";
import Point from "@arcgis/core/geometry/Point";
import { setExtent, selectMapExtent } from "@/redux/features/mapSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  geodesicBuffer,
  buffer,
} from "@arcgis/core/geometry/geometryEngine.js";

type GetExtentType = {
  pointCoordinates: { lat: number; long: number };
  unit: __esri.LinearUnits;
  distance: number;
};
function useGetExtent({ pointCoordinates, unit, distance }: GetExtentType) {
  const dispatch = useAppDispatch();
  console.log("heyyyy");
  const mapExtent = useAppSelector(selectMapExtent);
  const point = new Point({
    x: pointCoordinates.long,
    y: pointCoordinates.lat,
    spatialReference: { wkid: 3857 },
  });

  const bufferedGeometry = buffer(point, distance, "kilometers");
  console.log(bufferedGeometry);
  // if (bufferedGeometry) {
  const polygon = bufferedGeometry as __esri.Polygon;
  const extent = polygon.extent;
  console.log(extent.toJSON());
  // const polygonCoordinates = polygon.rings[0] as [number, number][];
  // dispatch(setExtent(extent.toJSON()));
  return { mapExtent: extent, mapCenter: point };
  // }
}

export default useGetExtent;
