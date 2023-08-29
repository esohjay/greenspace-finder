"use client";
import MapContainer from "@/components/map";
import Items from "./places/items";
import Link from "next/link";
import useCreateMap from "@/hooks/useCreateMap";
export default function Home() {
  useCreateMap("map");
  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <h2>Greenspace finder</h2>
      <div id="map"></div>
      {/* <div className="h-[350px] w-[350px] p-2">
        <MapContainer
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div> */}
      <Link href={"places"}>places</Link>
      {/* <Items /> */}
    </main>
  );
}
