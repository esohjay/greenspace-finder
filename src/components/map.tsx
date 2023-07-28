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

      // Create an OGC XML filter parameter value
      const xml = `<ogc:Filter>
    <ogc:And>
      <ogc:BBOX>
        <ogc:PropertyName>SHAPE</ogc:PropertyName>
        <gml:Box srsName="EPSG:3857">
          <gml:coordinates>${coords}</gml:coordinates>
        </gml:Box>
      </ogc:BBOX>
      <ogc:PropertyIsEqualTo>
        <ogc:PropertyName>SiteFunction</ogc:PropertyName>
        <ogc:Literal>Airport</ogc:Literal>
      </ogc:PropertyIsEqualTo>
    </ogc:And>
  </ogc:Filter>`;

      // Define (WFS) parameters object.
      const wfsParams = {
        key: "xjbXiGAwlVbHDEAAjBqz9RPxKOEy3lHy",
        service: "WFS",
        request: "GetFeature",
        version: "2.0.0",
        typeNames: "Sites_FunctionalSite",
        outputFormat: "GEOJSON",
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
        const map = new Map(mapOptions);
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
        // Define (WFS) parameters object.
        const wfsParams = {
          key: "xjbXiGAwlVbHDEAAjBqz9RPxKOEy3lHy",
          service: "WFS",
          request: "GetFeature",
          version: "2.0.0",
          typeNames: "Zoomstack_NationalParks",
          outputFormat: "GEOJSON",
          // filter: xml
        };
        // Watch for map view stationary event
        const layer = new WFSLayer({
          url: getUrl(wfsParams),
        });

        map.add(layer);

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
