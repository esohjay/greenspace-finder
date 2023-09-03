import React from "react";
import Image from "next/image";

type propType = {
  text: string;
  src: string;
};
function CircleImage({ text, src }: propType) {
  return (
    <article className="flex flex-col">
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
      <p className="text-center font-semibold capitalize">{text}</p>
    </article>
  );
}

export default CircleImage;
