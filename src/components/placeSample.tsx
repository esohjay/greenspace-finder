import React from "react";
import Image from "next/image";
import Link from "next/link";

type propType = {
  type: string;
  dist: string;
  imgLink: string;
  link: string;
  //   id: string
};
function Place({ type, dist, link, imgLink }: propType) {
  return (
    <a
      href={link}
      target="_blank"
      className="block rounded-lg hover:cursor-pointer  shadow-indigo-100 "
    >
      <figure className=" w-44 h-44 relative">
        <Image
          alt="Home"
          fill
          src={imgLink}
          className="h-full w-full rounded-md object-cover"
        />
      </figure>
      <div className="mt-2">
        <p className="font-medium">{type}</p>
        <p className="text-sm text-gray-500">{dist}</p>
      </div>
    </a>
  );
}

export default Place;
