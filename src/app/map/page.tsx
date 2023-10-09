import React from "react";
import MapContainer from "@/components/map";

function Map() {
  return (
    <main className="grid place-items-center">
      <section className="w-full h-screen p-5 max-w-lg bg-white">
        <section className="w-full h-[80vh]">
          <MapContainer
            mapOptions={{
              basemap: "streets-vector",
            }}
          />
        </section>
      </section>
    </main>
  );
}

export default Map;
