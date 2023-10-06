import esriRequest from "@arcgis/core/request";
import { GeoJSONFeatureCollection, fetchFeatureType } from "@/types/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFeatureStartIndex, setStatus } from "@/redux/features/mapSlice";

function useFetchFeatures() {
  const dispatch = useAppDispatch();
  const startIndex = useAppSelector(selectFeatureStartIndex);

  const getUrl = (params: Record<string, string>) => {
    const encodedParameters = Object.keys(params)
      .map((paramName) => paramName + "=" + encodeURI(params[paramName]))
      .join("&");

    return "https://api.os.uk/features/v1/wfs?" + encodedParameters;
  };
  const setXml = (extent: __esri.Extent, type: string | null) => {
    // Convert the bounds to a formatted string.
    console.log(extent.toJSON());
    const sw = extent.xmin + "," + extent.ymin;
    const ne = extent.xmax + "," + extent.ymax;
    const coords = sw + " " + ne;
    let xml: string = "";
    if (type) {
      xml = "<ogc:Filter>";
      xml += "<ogc:And>";
      xml += "<ogc:BBOX>";
      xml += '<gml:Box srsName="EPSG:3857">';
      xml += "<ogc:PropertyName>SHAPE</ogc:PropertyName>";
      xml += "<gml:coordinates>" + coords + "</gml:coordinates>";
      xml += "</gml:Box>";
      xml += "</ogc:BBOX>";
      xml += "<ogc:PropertyIsEqualTo>";
      xml += "<ogc:PropertyName>TYPE</ogc:PropertyName>";
      xml += "<ogc:Literal>" + type + "</ogc:Literal>";
      xml += "</ogc:PropertyIsEqualTo>";
      xml += "</ogc:And>";
      xml += "</ogc:Filter>";
    } else {
      xml = "<ogc:Filter>";
      xml += "<ogc:BBOX>";
      xml += '<gml:Box srsName="EPSG:3857">';
      xml += "<ogc:PropertyName>SHAPE</ogc:PropertyName>";
      xml += "<gml:coordinates>" + coords + "</gml:coordinates>";
      xml += "</gml:Box>";
      xml += "</ogc:BBOX>";
      xml += "</ogc:Filter>";
    }
    return xml;
  };

  // Define a function to get features from the WFS
  const getFeatures = async (
    options: fetchFeatureType
  ): Promise<GeoJSONFeatureCollection> => {
    dispatch(setStatus("loading"));
    const xml = setXml(options.extent, options.type);
    // Define (WFS) parameters object.
    const apikey = process.env.NEXT_PUBLIC_OS_APIKEY as string;
    const wfsParams = {
      key: apikey,
      service: "WFS",
      request: "GetFeature",
      version: "2.0.0",
      typeNames: "Zoomstack_Greenspace",
      outputFormat: "GEOJSON",
      srsName: "EPSG:3857",
      filter: xml,
      count: options.isMap ? "100" : "20",
      startIndex: options.isMap ? "0" : `${startIndex}`,
    };

    const url = getUrl(wfsParams);
    const features = esriRequest(url, { responseType: "json" }).then(
      (response: any) => response.data
    );
    return features;
  };
  const getSavedFeatures = async (
    featureIds: string[]
  ): Promise<GeoJSONFeatureCollection> => {
    dispatch(setStatus("loading"));
    let filterExpression: string = "";
    for (let featureId of featureIds) {
      let filterString = "<ogc:PropertyIsEqualTo>";
      filterString += "<ogc:PropertyName>OBJECTID</ogc:PropertyName>";
      filterString += "<ogc:Literal>" + featureId + "</ogc:Literal>";
      filterString += "</ogc:PropertyIsEqualTo>";
      filterExpression += filterString;
    }
    let xml = "<ogc:Filter>";
    xml += "<Or>";
    xml += filterExpression;
    xml += "</Or>";
    xml += "</ogc:Filter>";
    const apikey = process.env.NEXT_PUBLIC_OS_APIKEY as string;
    const wfsParams = {
      key: apikey,
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
    // const features = esriRequest(url, { responseType: "json" }).then(
    //   (response: any) => response.data
    // );
    if (data) {
      dispatch(setStatus("success"));
    } else {
      dispatch(setStatus("failed"));
    }
    return data;
  };
  const getSingleFeature = async (
    id: string
  ): Promise<GeoJSONFeatureCollection> => {
    let xml = "<ogc:Filter>";
    xml += "<ogc:PropertyIsEqualTo>";
    xml += "<ogc:PropertyName>OBJECTID</ogc:PropertyName>";
    xml += "<ogc:Literal>" + id + "</ogc:Literal>";
    xml += "</ogc:PropertyIsEqualTo>";
    xml += "</ogc:Filter>";
    const apikey = process.env.NEXT_PUBLIC_OS_APIKEY as string;
    const wfsParams = {
      key: apikey,
      service: "WFS",
      request: "GetFeature",
      version: "2.0.0",
      typeNames: "Zoomstack_Greenspace",
      outputFormat: "GEOJSON",
      srsName: "EPSG:3857",
      filter: xml,
    };

    const url = getUrl(wfsParams);
    const features = esriRequest(url, { responseType: "json" }).then(
      (response: any) => response.data
    );
    return features;
  };
  return {
    getFeatures,
    getSingleFeature,
    getSavedFeatures,
  };
}

export default useFetchFeatures;
