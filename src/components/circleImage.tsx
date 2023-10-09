import React from "react";
import Image from "next/image";
import Link from "next/link";

type propType = {
  text: string;
  src: string;
};
function CircleImage({ text, src }: propType) {
  return (
    <Link
      href={`/places?type=${text}`}
      className="flex flex-col justify-center items-center shrink-0"
    >
      <div className="w-20 h-20 rounded-full">
        <figure className="w-full h-full block relative border-4 border-mainColor rounded-full">
          <Image
            src={src}
            alt="ugs with family"
            fill
            className="rounded-full border-2"
          />
        </figure>
      </div>
      <p className="text-center font-semibold text-xs md:text-sm capitalize">
        {text}
      </p>
    </Link>
  );
}

export default CircleImage;
