import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/types/supabase";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  console.log("here");
  console.log("here");
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  const { searchParams } = new URL(req.url);
  // console.log(session?.user, "user");
  const id = searchParams.get("id");
  let { error, data } = await supabase
    .from("profiles")
    .select()
    .eq("id", `${id}`);
  console.log(data);
  return Response.json({ data });
}
