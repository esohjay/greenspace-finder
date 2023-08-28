import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { GeoJSONFeatureCollection, GeoJSONFeature } from "@/types/features";

import Point from "@arcgis/core/geometry/Point";
import esriRequest from "@arcgis/core/request";

import { getUrl } from "@/lib/mapUtils";

type MapState = {
  features: GeoJSONFeature[];
  status: "idle" | "loading" | "success" | "failed";
  error: null;
  center: Point | null;
  extent: __esri.Extent | null;
  featureCount: number;
  featureStartIndex: number;
  hasNext: boolean;
};
const initialState: MapState = {
  features: [],
  status: "idle",
  error: null,
  extent: null,
  center: null,
  featureCount: 20,
  featureStartIndex: 0,
  hasNext: true,
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
    // console.log(newData);
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
    setFeatures: (state, action: PayloadAction<GeoJSONFeature[]>) => {
      state.features = state.features.concat(action.payload);
    },
    setHasNext: (state, action: PayloadAction<boolean>) => {
      state.hasNext = action.payload;
    },
    setFeatureStartIndex: (state, action: PayloadAction<number>) => {
      state.featureStartIndex = action.payload;
    },
    setExtent: (state, action: PayloadAction<__esri.Extent | null>) => {
      state.extent = action.payload;
    },
    setCenter: (state, action: PayloadAction<Point | null>) => {
      state.center = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "success" | "failed">
    ) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    //getFeature
    // builder.addCase(getFeatures.fulfilled, (state, action) => {
    //   state.mapFeatures = action.payload;
    //   state.status = "success";
    // });
    builder.addCase(getFeatures.rejected, (state, action) => {
      // state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(getFeatures.pending, (state, action) => {
      state.status = "loading";
    });
  },
});
export const {
  setCenter,
  setExtent,
  setFeatures,
  setFeatureStartIndex,
  setHasNext,
  setStatus,
} = mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFeatures = (state: RootState) => state.map.features;
export const selectMapCenter = (state: RootState) => state.map.center;
export const selectMapExtent = (state: RootState) => state.map.extent;
export const selectStatus = (state: RootState) => state.map.status;
export const selectHasNext = (state: RootState) => state.map.hasNext;
export const selectFeatureCount = (state: RootState) => state.map.featureCount;
export const selectFeatureStartIndex = (state: RootState) =>
  state.map.featureStartIndex;

export default mapSlice.reducer;
