import MapContainer from "@/components/map";
import MapDisplay from "@/components/mapDisplay";
import Items from "./places/items";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="h-48 bg-altColor w-full p-5">
        <h3 className="px-2 py-1 border-4 border-white text-white font-extrabold inline-block mb-3">
          GreenExplorer
        </h3>
        <h2 className="text-white font-extrabold text-3xl">Explore</h2>
      </header>

      {/* <div className="h-[350px] w-[350px] p-2">
        <MapContainer
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div>
      <Link href={"places"}>places</Link> */}
    </main>
  );
}
