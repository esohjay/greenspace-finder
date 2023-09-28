import React from "react";
import Point from "@arcgis/core/geometry/Point";
import { setExtent, selectMapExtent } from "@/redux/features/mapSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";

type GetExtentType = {
  pointCoordinates: { lat: number; long: number };
  unit: __esri.LinearUnits;
  distance: number;
};
function useGetExtent({ pointCoordinates, unit, distance }: GetExtentType) {
  const dispatch = useAppDispatch();
  const mapExtent = useAppSelector(selectMapExtent);
  const point = new Point({
    x: pointCoordinates.long,
    y: pointCoordinates.lat,
  });
  const bufferedGeometry = geometryEngine.geodesicBuffer(point, distance, unit);
  if (bufferedGeometry) {
    const polygon = bufferedGeometry as __esri.Polygon;
    const extent = polygon.extent;
    // const polygonCoordinates = polygon.rings[0] as [number, number][];
    dispatch(setExtent(extent.toJSON()));
  }
  return mapExtent;
}

export default useGetExtent;
