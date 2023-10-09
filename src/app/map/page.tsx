import React from "react";
import MapContainer from "@/components/map";
import BackBtn from "@/components/backBtn";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
async function getData() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const id = session?.user.id!;
  const { data } = await supabase.from("profiles").select().eq("id", id);
  const userData = data!;
  return userData;
}

async function Map() {
  const data = await getData();
  const lat = data[0].latitude!;
  const long = data[0].longitude!;
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
            coordinates={[lat, long]}
          />
        </section>
      </section>
    </main>
  );
}

export default Map;
