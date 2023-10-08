import React from "react";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SavedPlaces from "./saved";

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
async function Saved() {
  const data = await getData();
  return <SavedPlaces user={data[0]} />;
}

export default Saved;
