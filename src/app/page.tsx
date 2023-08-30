import MapContainer from "@/components/map";
import MapDisplay from "@/components/mapDisplay";
import Items from "./places/items";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <h2>Greenspace finder</h2>
      {/* <div className="h-[350px] w-[350px] p-2">
        <MapDisplay
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div> */}
      <div className="h-[350px] w-[350px] p-2">
        <MapContainer
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div>
      <Link href={"places"}>places</Link>
      {/* <Items /> */}
    </main>
  );
}
