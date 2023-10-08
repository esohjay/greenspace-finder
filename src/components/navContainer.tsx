import React from "react";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Nav from "./nav";
async function getData() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
async function NavContainer() {
  const session = await getData();
  return <Nav session={session} />;
}

export default NavContainer;
