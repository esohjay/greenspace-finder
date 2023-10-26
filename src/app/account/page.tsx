import React from "react";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Account from "./account";
import BackBtn from "@/components/backBtn";
import EditAuthDetails from "./editAuthDetails";

async function getData() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const id = session?.user.id!;
  const { data } = await supabase.from("profiles").select().eq("id", id);
  const userData = data!;
  return { data: userData, email: session?.user.email };
}
async function Saved() {
  const { data, email } = await getData();
  return (
    <main className="grid place-items-center">
      <section className="w-full min-h-screen  max-w-lg bg-white">
        <header className=" pb-5 pt-7 bg-mainColor px-5">
          <div className="flex justify-between items-center">
            <BackBtn />
            <h3 className="text-white text-center font-semibold text-lg">
              My Account
            </h3>
            <div></div>
          </div>
        </header>
        <Account user={data[0]} />
        <EditAuthDetails email={email} />
      </section>
    </main>
  );
}

export default Saved;
