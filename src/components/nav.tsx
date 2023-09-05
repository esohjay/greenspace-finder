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
import Link from "next/link";

function Nav() {
  const pathname = usePathname();
  return (
    <div className="relative w-full">
      <nav className="z-20 flex  justify-around gap-4 border-t border-gray-200 bg-gray-100 p-2.5 shadow-lg backdrop-blur-lg fixed bottom-0 md:hidden min-h-[auto]  w-full rounded-lg border">
        <Link
          href="/"
          className={` ${
            pathname === "/" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          {pathname === "/" ? <MdExplore /> : <MdOutlineExplore />}
          <small className="text-center text-xs font-medium"> Explore </small>
        </Link>
        <Link
          href="/search"
          className={` ${
            pathname === "/search" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          <RiSearchLine />
          <small className="text-center text-xs font-medium"> Search </small>
        </Link>

        <Link
          href="/"
          className={` ${
            pathname === "/" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          {pathname === "/" ? <MdBookmarks /> : <MdOutlineBookmarks />}
          <small className="text-center text-xs font-medium"> Saved </small>
        </Link>
        <Link
          href="/"
          className={` ${
            pathname === "/" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          {pathname === "/" ? <FaUserCircle /> : <FaRegUserCircle />}
          <small className="text-center text-xs font-medium"> Settings </small>
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
