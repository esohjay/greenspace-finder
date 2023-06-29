import Image from "next/image";
import MapContainer from "@/components/map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="h-[350px] w-[350px] p-2">
        <MapContainer
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div>
    </main>
  );
}
