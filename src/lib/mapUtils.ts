import esriRequest from "@arcgis/core/request";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import { GeoJSONFeatureCollection, GeoJSONFeature } from "@/types/features";

export const getUrl = (params: Record<string, string>) => {
  const encodedParameters = Object.keys(params)
    .map((paramName) => paramName + "=" + encodeURI(params[paramName]))
    .join("&");

  return "https://api.os.uk/features/v1/wfs?" + encodedParameters;
};

// Define a function to get features from the WFS
export const getFeatures = async (
  extent: __esri.Extent
): Promise<GeoJSONFeatureCollection> => {
  // Convert the bounds to a formatted string.
  const sw = extent.xmin + "," + extent.ymin;
  const ne = extent.xmax + "," + extent.ymax;
  const coords = sw + " " + ne;

  // Buffer point by 1000 feet

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
  const wfsParams = {
    key: "xjbXiGAwlVbHDEAAjBqz9RPxKOEy3lHy",
    service: "WFS",
    request: "GetFeature",
    version: "2.0.0",
    typeNames: "Zoomstack_Greenspace",
    outputFormat: "GEOJSON",
    srsName: "EPSG:3857",
    filter: xml,
  };

  // const options = {
  //   responseType: 'json'
  // };

  const url = getUrl(wfsParams);

  return esriRequest(url, { responseType: "json" }).then(
    (response: any) => response.data
  );
};
export const createPolygon = (feature: GeoJSONFeature) => {
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
export const calculateDistance = (
  center: Point | null,
  g: __esri.Graphic
): number => {
  let distance = 0;
  //get the coordinates of the feature graphics (polygon feature)
  const rings = g.geometry.toJSON().rings;
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
