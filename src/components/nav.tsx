"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  MdOutlineExplore,
  MdOutlineGroup,
  MdExplore,
  MdBookmarks,
  MdOutlineBookmarks,
} from "react-icons/md";
import {
  FaSearchLocation,
  FaRegUser,
  FaUserCircle,
  FaRegUserCircle,
} from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { TbHomeEco } from "react-icons/tb";
import Link from "next/link";
import { Session } from "@supabase/auth-helpers-nextjs";

function Nav({ session }: { session: Session | null }) {
  const pathname = usePathname();
  return (
    <div
      className={`relative w-full grid place-items-center  ${
        session ? "block mt-[75px]" : "hidden"
      }`}
    >
      <nav className="z-20 flex max-w-lg justify-around gap-4 border-t border-gray-200 bg-gray-100 p-2.5 shadow-lg backdrop-blur-lg fixed bottom-0  min-h-[auto]  w-full rounded-lg border">
        <Link
          href="/"
          className={` ${
            pathname === "/" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          <TbHomeEco />
          <small className="text-center text-xs font-medium"> Home </small>
        </Link>
        <Link
          href="/places"
          className={` ${
            pathname === "/places" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          {pathname === "/places" ? <MdExplore /> : <MdOutlineExplore />}
          <small className="text-center text-xs font-medium"> Explore </small>
        </Link>
        {/* <Link
          href="/search"
          className={` ${
            pathname === "/search" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          <RiSearchLine />
          <small className="text-center text-xs font-medium"> Search </small>
        </Link> */}

        <Link
          href="/saved"
          className={` ${
            pathname === "/saved" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          {pathname === "/saved" ? <MdBookmarks /> : <MdOutlineBookmarks />}
          <small className="text-center text-xs font-medium"> Saved </small>
        </Link>
        <Link
          href="/settings"
          className={` ${
            pathname === "/settings" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          {pathname === "/settings" ? <FaUserCircle /> : <FaRegUserCircle />}
          <small className="text-center text-xs font-medium"> Settings </small>
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
