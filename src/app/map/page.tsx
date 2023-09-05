import React from "react";
import MapContainer from "@/components/map";

function Map() {
  return (
    <div className="h-[350px] w-[350px] p-2">
      <MapContainer
        mapOptions={{
          basemap: "streets-vector",
        }}
      />
    </div>
  );
}

export default Map;
