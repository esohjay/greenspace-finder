import React from "react";
import LocationMap from "@/components/locationMap";

function Location() {
  return (
    <section>
      <article>
        <h3>Select location</h3>
      </article>
      <div className="h-[350px] w-[350px] p-2">
        <LocationMap
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div>
    </section>
  );
}

export default Location;
