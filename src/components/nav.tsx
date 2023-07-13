import React from "react";
import { MdOutlineExplore, MdOutlineGroup } from "react-icons/md";
import { FaSearchLocation, FaRegUser, FaRegBookmark } from "react-icons/fa";
import Link from "next/link";

function Nav() {
  return (
    <div className="relative w-full">
      <nav className="z-20 flex  justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed bottom-0 md:hidden min-h-[auto]  w-full rounded-lg border">
        <Link
          href="#profile"
          className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 bg-indigo-50 text-indigo-600 dark:bg-sky-900 dark:text-sky-50"
        >
          <FaSearchLocation />
          <small className="text-center text-xs font-medium"> Explore </small>
        </Link>

        <Link
          href="#analytics"
          className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
        >
          <MdOutlineGroup />
          <small className="text-center text-xs font-medium"> Community </small>
        </Link>

        <Link
          href="#settings"
          className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
        >
          <FaSearchLocation />

          <small className="text-center text-xs font-medium"> Navigate </small>
        </Link>

        <Link
          href="/"
          className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
        >
          <FaRegBookmark />
          <small className="text-xs font-medium">Saved</small>
        </Link>
        <Link
          href="/"
          className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
        >
          <FaRegUser />
          <small className="text-xs font-medium">Profile</small>
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
