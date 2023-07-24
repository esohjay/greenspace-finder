import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  //   await supabase.auth.getSession();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if user is signed in and the current path is / redirect the user to /account
  if (session && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!session && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/account"],
};
