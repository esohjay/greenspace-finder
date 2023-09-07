import React from "react";
import { GeoJSONFeature } from "@/types/features";
import Image from "next/image";
import Link from "next/link";

type propType = {
  type: string;
  dist: string;
  //   id: string
};
function Place({ type, dist }: propType) {
  return (
    <article className="block rounded-lg   shadow-indigo-100 ">
      <figure className=" w-44 h-44 relative">
        <Image
          alt="Home"
          fill
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full rounded-md object-cover"
        />
      </figure>
      <div className="mt-2">
        <p className="font-medium">{type}</p>
        <p className="text-sm text-gray-500">{dist}km away</p>
        {/* <dl>
          <div>
            <dt className="sr-only">Distance</dt>

            <dd className="text-sm text-gray-500">{dist}km away</dd>
          </div>

          <div>
            <dt className="sr-only">Address</dt>

            <dd className="font-medium">{type}</dd>
          </div>
        </dl> */}
      </div>
    </article>
  );
}

export default Place;
