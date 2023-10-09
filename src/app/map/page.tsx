import React from "react";
import MapContainer from "@/components/map";
import BackBtn from "@/components/backBtn";

function Map() {
  return (
    <main className="grid place-items-center">
      <section className="w-full h-screen  max-w-lg bg-white">
        <header className=" pb-5 pt-7 bg-mainColor px-5">
          <div className="flex justify-between items-center">
            <BackBtn />
            <h3 className="text-white text-center font-semibold text-lg">
              Map
            </h3>
            <div></div>
          </div>
        </header>
        <section className="w-full h-[70vh] p-5">
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
