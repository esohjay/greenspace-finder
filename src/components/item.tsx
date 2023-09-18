"use client";
import React from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
// import { HiOutlineLocationMarker, HiOutlineEye } from "react-icons/hi";

function Item() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
      <button onClick={handleSignOut}>signOut</button>
      {/* <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
        <div className="w-6 flex flex-col items-center">
          <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2  mt-1 rounded-full ">
            <Image
              className="rounded-full"
              alt="A"
              width={20}
              height={20}
              src="https://cdn.pixabay.com/photo/2017/06/02/18/44/ice-2367072_1280.jpg"
            />{" "}
          </div>
        </div>
        <div className="w-full items-center flex">
          <div className="mx-2 -mt-1  ">
            Liza Blue
            <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
              COO &amp; co-founder
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Item;
