import React from "react";
import Image from "next/image";
import Link from "next/link";

type propType = {
  text: string;
  imgUrl: string;
  link: string;
  //   id: string
};
function Activity({ text, imgUrl, link }: propType) {
  return (
    <Link
      href={link}
      className="block hover:cursor-pointer rounded-lg  shadow-sm shadow-indigo-100 "
    >
      <figure className="w-44 h-44 relative">
        <Image
          alt="Home"
          fill
          src={imgUrl}
          className="h-full w-full rounded-sm object-cover"
        />
        <div className="absolute flex items-end h-full w-full rounded-sm bg-black bg-opacity-20">
          <p className="font-semibold text-white p-2 text-lg">{text}</p>
        </div>
      </figure>
    </Link>
  );
}

export default Activity;
