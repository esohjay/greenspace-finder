import React from "react";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import Location from "./location";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

async function LocationPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <Location session={session} />;
}

export default LocationPage;
