import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import useFetchFeatures from "./useFetchFeatures";
import { GeoJSONFeatureCollection, GeoJSONFeature } from "@/types/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFeatures,
  setFeatureStartIndex,
  selectFeatureCount,
  selectFeatureStartIndex,
  setHasNext,
  setStatus,
  setCategories,
  selectCategories,
} from "@/redux/features/mapSlice";

function useMapUtils() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const startIndex = useAppSelector(selectFeatureStartIndex);
  const count = useAppSelector(selectFeatureCount);
  const { getFeatures } = useFetchFeatures();

  const createPolygon = (feature: GeoJSONFeature) => {
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

  const calculateDistance = (
    center: Point | null,
    graphic: __esri.Graphic
  ): number => {
    let distance = 0;
    //get the coordinates of the feature graphics (polygon feature)
    const rings = graphic.geometry.toJSON().rings;
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
  //this function creates graphics, calculate feature distance using graphics geometry
  //and extract the categories of features. Its returns the graphics and the featureCollelection
  const createGraphicsAndFeatures = (
    features: GeoJSONFeatureCollection,
    mapCenter: Point
  ) => {
    let featureCollection: GeoJSONFeature[] = [];
    let featureCategories: string[] = [];
    const graphics = features.features.map((feature) => {
      const graphic = createPolygon(feature);
      const distance = calculateDistance(mapCenter, graphic).toFixed(1);

      const featureWithDistance = {
        ...feature,
        properties: { ...feature.properties, distance },
      };
      featureCollection.push(featureWithDistance);
      featureCategories.push(feature.properties.Type);
      return graphic;
    });
    //set catergories
    const categoriesList = [...categories, ...featureCategories];
    const uniqueCategories = [...new Set(categoriesList)];
    dispatch(setCategories(uniqueCategories));
    return { graphics, featureCollection };
  };
  const getGeoJSONFeatures = async (
    mapExtent: __esri.Extent,
    mapCenter: Point,
    category?: string
  ) => {
    const features = await getFeatures({
      extent: mapExtent,
      category,
    });
    if (features.features.length < count) {
      dispatch(setHasNext(false));
    }
    dispatch(setFeatureStartIndex(startIndex + count));
    if (features && features.features.length > 0) {
      const { featureCollection } = createGraphicsAndFeatures(
        features,
        mapCenter
      );
      dispatch(setFeatures(featureCollection));
    }
    dispatch(setStatus("success"));
  };
  return {
    calculateDistance,
    createPolygon,
    createGraphicsAndFeatures,
    getGeoJSONFeatures,
  };
}

export default useMapUtils;
