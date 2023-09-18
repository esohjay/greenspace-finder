import React from "react";
import LocationMap from "@/components/locationMap";

function Location() {
  return (
    <div className="h-[350px] w-[350px] p-2">
      <LocationMap
        mapOptions={{
          basemap: "streets-vector",
        }}
      />
    </div>
  );
}

export default Location;
