import React from "react";
import Link from "next/link";

function nav() {
  return (
    <nav className="w-full bg-white text-black">
      <Link href={"/"}>Home</Link>
    </nav>
  );
}

export default nav;
