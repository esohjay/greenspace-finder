import esriRequest from "@arcgis/core/request";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point";

export const getUrl = (params: Record<string, string>) => {
  const encodedParameters = Object.keys(params)
    .map((paramName) => paramName + "=" + encodeURI(params[paramName]))
    .join("&");

  return "https://api.os.uk/features/v1/wfs?" + encodedParameters;
};

// Define a function to get features from the WFS
export const getFeatures = async (extent: __esri.Extent) => {
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
