import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { GeoJSONFeatureCollection, GeoJSONFeature } from "@/types/features";
import Graphic from "@arcgis/core/Graphic";
import esriRequest from "@arcgis/core/request";
import { getUrl } from "@/lib/mapUtils";
// import axios from "axios";

type MapState = {
  mapFeatures: GeoJSONFeatureCollection | null;
  status: string;
  error: null;
};
const initialState: MapState = {
  mapFeatures: null,
  status: "idle",
  error: null,
};

//get features
export const getFeatures = createAsyncThunk(
  "map/getFeatures",
  async (extent: __esri.Extent): Promise<GeoJSONFeatureCollection> => {
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
  },
  extraReducers: (builder) => {
    //sign up
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
  },
});
export const { setMapFeatures } = mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMapFeatures = (state: RootState) => state.map.mapFeatures;

export default mapSlice.reducer;
