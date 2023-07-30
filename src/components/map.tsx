"use client";
import React, { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import WFSLayer from "@arcgis/core/layers/WFSLayer";
import Graphic from "@arcgis/core/Graphic";
import esriRequest from "@arcgis/core/request";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/light/main.css";

type MapDisplayProps = {
  mapOptions: __esri.MapProperties;
};
function MapDisplay({ mapOptions }: MapDisplayProps) {
  const mapDiv = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function getUrl(params: Record<string, string>) {
      const encodedParameters = Object.keys(params)
        .map((paramName) => paramName + "=" + encodeURI(params[paramName]))
        .join("&");

      return "https://api.os.uk/features/v1/wfs?" + encodedParameters;
    }
    // Define a function to get features from the WFS
    async function getFeatures(extent: __esri.Extent) {
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
    }

    const initializeMap = async () => {
      try {
        let xml = "<ogc:Filter>";
        xml += "<ogc:BBOX>";
        xml += "<ogc:PropertyName>SHAPE</ogc:PropertyName>";
        xml += '<gml:Box srsName="EPSG:3857">';
        // xml += '<gml:coordinates>' + coords + '</gml:coordinates>';
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

        // Watch for map view stationary event
        const layer = new WFSLayer({
          url: getUrl(wfsParams),
        });

        const map = new Map({ ...mapOptions, layers: [layer] });
        const view = new MapView({
          container: "viewDiv", //mapDiv.current,
          map,
          zoom: 10,
          center: [-0.09, 51.505],

          constraints: {
            minZoom: 7,
            maxZoom: 20,
            rotationEnabled: false,
          },
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
  return (
    <div
      id="viewDiv"
      ref={mapDiv}
      //   style={{ height: "100vh", width: "100%" }}
      className="w-full h-full"
    ></div>
  );
}

export default MapDisplay;
