import React from "react";
import LocationMap from "@/components/locationMap";
import { FaSearchLocation } from "react-icons/fa";

function Location() {
  return (
    <section>
      <article className="p-5 bg-mainColor text-white">
        <h3 className="text-center mb-3 text-lg font-bold">Select location</h3>
        <form className="flex gap-x-3 items-center">
          <input type="text" className="w-full bg-secondaryColor p-2 rounded" />
          <button className="text-white text-xl ">
            <FaSearchLocation />
          </button>
        </form>
      </article>
      <div className="h-[350px] w-full p-2">
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
