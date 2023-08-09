import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { GeoJSONFeatureCollection } from "@/types/features";
// import axios from "axios";

type MapState = {
  mapFeatures: GeoJSONFeatureCollection | null;
};
const initialState: MapState = {
  mapFeatures: null,
};

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
  extraReducers: (builder) => {},
});
export const { setMapFeatures } = mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMapFeatures = (state: RootState) => state.map.mapFeatures;

export default mapSlice.reducer;
