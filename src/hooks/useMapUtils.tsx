import React from "react";
import esriRequest from "@arcgis/core/request";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import { GeoJSONFeatureCollection, GeoJSONFeature } from "@/types/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFeatures,
  setFeatureStartIndex,
  selectFeatureCount,
  selectFeatureStartIndex,
  setHasNext,
  setStatus,
  setCategories,
  selectCategories,
} from "@/redux/features/mapSlice";

function useMapUtils() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const startIndex = useAppSelector(selectFeatureStartIndex);
  const count = useAppSelector(selectFeatureCount);
  const getUrl = (params: Record<string, string>) => {
    const encodedParameters = Object.keys(params)
      .map((paramName) => paramName + "=" + encodeURI(params[paramName]))
      .join("&");

    return "https://api.os.uk/features/v1/wfs?" + encodedParameters;
  };

  // Define a function to get features from the WFS
  const getFeatures = async (
    extent: __esri.Extent,
    startIndex: string,
    isMap?: boolean
  ): Promise<GeoJSONFeatureCollection> => {
    dispatch(setStatus("loading"));
    // Convert the bounds to a formatted string.
    const sw = extent.xmin + "," + extent.ymin;
    const ne = extent.xmax + "," + extent.ymax;
    const coords = sw + " " + ne;

    // Create an OGC XML filter parameter value which will select the Greenspace
    // features intersecting the BBOX coordinates.

    let xml = "<ogc:Filter>";
    xml += "<ogc:BBOX>";
    xml += "<ogc:PropertyName>SHAPE</ogc:PropertyName>";
    xml += '<gml:Box srsName="EPSG:3857">';
    xml += "<gml:coordinates>" + coords + "</gml:coordinates>";
    xml += "</gml:Box>";
    xml += "</ogc:BBOX>";
    xml += "</ogc:Filter>";
    // Define (WFS) parameters object.
    const apikey = process.env.NEXT_PUBLIC_OS_APIKEY as string;
    const wfsParams = {
      key: apikey,
      service: "WFS",
      request: "GetFeature",
      version: "2.0.0",
      typeNames: "Zoomstack_Greenspace",
      outputFormat: "GEOJSON",
      srsName: "EPSG:3857",
      filter: xml,
      count: isMap ? "100" : "20",
      startIndex: isMap ? "0" : startIndex,
    };

    const url = getUrl(wfsParams);
    const features = esriRequest(url, { responseType: "json" }).then(
      (response: any) => response.data
    );
    return features;
  };

  const createPolygon = (feature: GeoJSONFeature) => {
    const polygon = {
      type: "polygon",
      rings: feature.geometry.coordinates[0],
      spatialReference: { wkid: 3857 },
    };

    const fillSymbol = {
      type: "simple-fill",
      color: "#0c0",
      outline: {
        color: "#0c0",
      },
    };
    return new Graphic({
      geometry: polygon,
      symbol: fillSymbol,
    });
  };

  const calculateDistance = (
    center: Point | null,
    graphic: __esri.Graphic
  ): number => {
    let distance = 0;
    //get the coordinates of the feature graphics (polygon feature)
    const rings = graphic.geometry.toJSON().rings;
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
    //user start point
    const x = center?.x!;
    const y = center?.y!;
    //some feature center are not correctly calculated, check for correct ones
    if (longitude && latitude) {
      //from user
      const startPoint = new Point({
        x,
        y,
        spatialReference: { wkid: 3857 },
      });
      //to polygon center
      const endPoint = new Point({
        x: longitude,
        y: latitude,
        spatialReference: { wkid: 3857 },
      });
      //calculate distance
      distance = geometryEngine.distance(startPoint, endPoint, "kilometers");
    }
    return distance;
  };
  //this function creates graphics, calculate feature distance using graphics geometry
  //and extract the categories of features. Its returns the graphics and the featureCollelection
  const createGraphicsAndFeatures = (
    features: GeoJSONFeatureCollection,
    mapCenter: Point
  ) => {
    let featureCollection: GeoJSONFeature[] = [];
    let featureCategories: string[] = [];
    const graphics = features.features.map((feature) => {
      const graphic = createPolygon(feature);
      const distance = calculateDistance(mapCenter, graphic).toFixed(1);

      const featureWithDistance = {
        ...feature,
        properties: { ...feature.properties, distance },
      };
      featureCollection.push(featureWithDistance);
      featureCategories.push(feature.properties.Type);
      return graphic;
    });
    //set catergories
    const categoriesList = [...categories, ...featureCategories];
    const uniqueCategories = [...new Set(categoriesList)];
    dispatch(setCategories(uniqueCategories));
    return { graphics, featureCollection };
  };
  const getGeoJSONFeatures = async (
    mapExtent: __esri.Extent,
    mapCenter: Point
  ) => {
    const features = await getFeatures(mapExtent, `${startIndex}`);
    if (features.features.length < count) {
      dispatch(setHasNext(false));
    }
    dispatch(setFeatureStartIndex(startIndex + count));
    if (features && features.features.length > 0) {
      const { featureCollection } = createGraphicsAndFeatures(
        features,
        mapCenter
      );
      dispatch(setFeatures(featureCollection));
    }
    dispatch(setStatus("success"));
  };
  const getSingleFeature = async (
    id: string
  ): Promise<GeoJSONFeatureCollection> => {
    let xml = "<ogc:Filter>";
    xml += "<ogc:PropertyIsEqualTo>";
    xml += "<ogc:PropertyName>OBJECTID</ogc:PropertyName>";
    xml += "<ogc:Literal>" + id + "</ogc:Literal>";
    xml += "</ogc:PropertyIsEqualTo>";
    xml += "</ogc:Filter>";
    const apikey = process.env.NEXT_PUBLIC_OS_APIKEY as string;
    const wfsParams = {
      key: apikey,
      service: "WFS",
      request: "GetFeature",
      version: "2.0.0",
      typeNames: "Zoomstack_Greenspace",
      outputFormat: "GEOJSON",
      srsName: "EPSG:3857",
      filter: xml,
    };

    const url = getUrl(wfsParams);
    const features = esriRequest(url, { responseType: "json" }).then(
      (response: any) => response.data
    );
    return features;
  };
  return {
    calculateDistance,
    getFeatures,
    createPolygon,
    createGraphicsAndFeatures,
    getGeoJSONFeatures,
    getSingleFeature,
  };
}

export default useMapUtils;
