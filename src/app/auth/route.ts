import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/types/supabase";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  console.log("here");
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { searchParams } = new URL(req.url);
  console.log(session?.user, "user");
  const id = searchParams.get("id");
  let { error, data } = await supabase
    .from("profiles")
    .select()
    .eq("id", `${session?.user?.id}`);
  console.log(data);
  return NextResponse.json(data);
}
