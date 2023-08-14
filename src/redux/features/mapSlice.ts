import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import {
  GeoJSONFeatureCollection,
  GeoJSONFeature,
  GeoJSONPolygonFeatureCollection,
} from "@/types/features";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Polyline from "@arcgis/core/geometry/Polyline";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
import esriRequest from "@arcgis/core/request";
import * as projection from "@arcgis/core/geometry/projection.js";
import { getUrl } from "@/lib/mapUtils";
// import axios from "axios";

type MapState = {
  mapFeatures: GeoJSONFeatureCollection | null;
  status: string;
  error: null;
  center: [number, number];
  extent: __esri.Extent | null;
};
const initialState: MapState = {
  mapFeatures: null,
  status: "idle",
  error: null,
  extent: null,
  center: [-2.415471, 53.577839],
};

//get features
export const getFeatures = createAsyncThunk(
  "map/getFeatures",
  async (
    extent: __esri.Extent,
    thunkApi
  ): Promise<GeoJSONFeatureCollection> => {
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

    const url = getUrl(wfsParams);
    const { data } = await esriRequest(url, { responseType: "json" });
    const featureData = data as GeoJSONPolygonFeatureCollection;
    let newData = [];

    const newDatas = featureData.features.map((feature) => {
      const state = thunkApi.getState() as RootState;
      const center = state.map.center;
      const polygon = new Polygon({
        hasZ: true,
        hasM: true,
        rings: feature.geometry.coordinates,
        spatialReference: { wkid: 3857 },
      });
      const featureCenter = polygon.centroid;
      const point = new Point({
        x: center[0],
        y: center[1],
        spatialReference: { wkid: 4326 },
      });
      const point2 = new Point({
        x: featureCenter.x,
        y: featureCenter.y,
        spatialReference: { wkid: 3857 },
      });
      const np = projection.project(polygon, { wkid: 4326 });
      console.log(polygon.toJSON());
      console.log(feature.geometry.coordinates);
      console.log(point.longitude, point.latitude);
      console.log(geometryEngine.distance(point2, point, "kilometers"));
      const polyline = new Polyline({
        paths: [[center, [point.longitude, point.latitude]]],
        spatialReference: { wkid: 4326 },
      });
      // console.log(polyline.paths);
      const dist = geometryEngine.geodesicLength(polyline, "kilometers");
      return {
        ...feature,
        properties: { ...feature.properties, distance: dist },
      };
    });
    console.log(newDatas);
    for (let feature of featureData.features) {
      const p5 = new Polyline({
        paths: [
          [
            [-2.29669, 53.591279],
            [-2.415471, 53.577839],
          ],
        ],
        spatialReference: { wkid: 4326 },
      });
      const dist4 = geometryEngine.geodesicLength(p5, "kilometers");

      const newFeature = {
        ...feature,
        properties: { ...feature.properties, distance: 9 },
      };
      newData.push(newFeature);
    }

    console.log(newData);
    return esriRequest(url, { responseType: "json" }).then(
      (response: any) => response.data
    );
  }
);
//get all features
export const getAllFeatures = createAsyncThunk(
  "map/getAllFeatures",
  async (extent: [number, number]): Promise<GeoJSONFeatureCollection> => {
    // Convert the bounds to a formatted string.

    const coords = extent[0] + "," + extent[1];

    // Create an OGC XML filter parameter value which will select the Greenspace
    // features intersecting the BBOX coordinates.

    let xml = "<ogc:Filter>";
    xml += "<ogc:PropertyName>SHAPE</ogc:PropertyName>";
    xml += '<gml:POLYGON srsName="EPSG:3857">';
    xml += "<gml:coordinates>" + coords + "</gml:coordinates>";
    xml += "</gml:POLYGON>";

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
      count: "20",
    };

    const url = getUrl(wfsParams);

    return esriRequest(url, { responseType: "json" }).then(
      (response: any) => response.data
    );
  }
);

export const mapSlice = createSlice({
  name: "map",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMapFeatures: (
      state,
      action: PayloadAction<GeoJSONFeatureCollection | null>
    ) => {
      state.mapFeatures = action.payload;
    },
    setExtent: (state, action: PayloadAction<__esri.Extent | null>) => {
      state.extent = action.payload;
    },
    setCenter: (state, action: PayloadAction<[number, number]>) => {
      state.center = action.payload;
    },
  },
  extraReducers: (builder) => {
    //getFeature
    builder.addCase(getFeatures.fulfilled, (state, action) => {
      state.mapFeatures = action.payload;
      state.status = "success";
    });
    builder.addCase(getFeatures.rejected, (state, action) => {
      // state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(getFeatures.pending, (state, action) => {
      state.status = "pending";
    });
    //getAllFeature
    builder.addCase(getAllFeatures.fulfilled, (state, action) => {
      state.mapFeatures = action.payload;
      state.status = "success";
    });
    builder.addCase(getAllFeatures.rejected, (state, action) => {
      // state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(getAllFeatures.pending, (state, action) => {
      state.status = "pending";
    });
  },
});
export const { setMapFeatures, setCenter, setExtent } = mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMapFeatures = (state: RootState) => state.map.mapFeatures;
export const selectMapCenter = (state: RootState) => state.map.center;
export const selectMapExtent = (state: RootState) => state.map.extent;

export default mapSlice.reducer;
