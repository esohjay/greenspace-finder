export interface GeoJSONProperties {
  [key: string]: any;
}

export interface GeoJSONGeometryPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface GeoJSONGeometryPolygon {
  type: "Polygon";
  coordinates: Array<Array<[number, number]>>;
}
export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: number[][][];
}

export interface GeoJSONFeature<
  P = GeoJSONProperties,
  G = GeoJSONGeometryPoint
> {
  type: "Feature";
  id: string;
  properties: P;
  geometry: G;
}

export interface GeoJSONFeatureCollection<
  P = GeoJSONProperties,
  G = GeoJSONGeometryPoint
> {
  type: "FeatureCollection";
  features: Array<GeoJSONFeature<P, G>>;
}

export interface GeoJSONPolygonFeature<
  P = GeoJSONProperties,
  G = GeoJSONGeometryPolygon
> {
  type: "Feature";
  id: string;
  properties: P;
  geometry: G;
}

export interface GeoJSONPolygonFeatureCollection<
  P = GeoJSONProperties,
  G = GeoJSONPolygon
> {
  type: "FeatureCollection";
  features: Array<GeoJSONPolygonFeature<P, G>>;
}
export type fetchFeatureType = {
  extent: __esri.Extent;
  // startIndex: string;
  isMap?: boolean;
  category?: string;
};
