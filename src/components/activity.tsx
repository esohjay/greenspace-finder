import React from "react";
import Image from "next/image";
import Link from "next/link";

type propType = {
  text: string;

  //   id: string
};
function Activity({ text }: propType) {
  return (
    <article className="block rounded-lg  shadow-sm shadow-indigo-100 ">
      <figure className="w-44 h-44 relative">
        <Image
          alt="Home"
          fill
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full rounded-sm object-cover"
        />
        <div className="absolute flex items-end h-full w-full rounded-sm bg-black bg-opacity-20">
          <p className="font-semibold text-white p-2 text-lg">{text}</p>
        </div>
      </figure>
    </article>
  );
}

export default Activity;
