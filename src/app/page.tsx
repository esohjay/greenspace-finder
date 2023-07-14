import Image from "next/image";
import MapContainer from "@/components/map";
import Item from "@/components/item";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <h2>Greenspace finder</h2>
      <div className="h-[350px] w-[350px] p-2">
        <MapContainer
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div>
      <Item />
    </main>
  );
}
