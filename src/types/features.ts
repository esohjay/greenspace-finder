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
