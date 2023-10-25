import React from "react";
import { GeoJSONFeature } from "@/types/features";
import Image from "next/image";
import Link from "next/link";
import { setImgUrl } from "@/lib/data";

type propType = {
  feature: GeoJSONFeature;
  isDistance: boolean;
};
function Place({ feature, isDistance }: propType) {
  const imgUrl = setImgUrl(feature.properties.Type);
  return (
    <Link
      href={`places/${feature.properties.OBJECTID}`}
      className="block rounded-lg p-4 shadow-sm hover:cursor-pointer shadow-indigo-100 shrink-0"
    >
      <Image
        alt="Home"
        width={200}
        height={200}
        src={imgUrl}
        className="h-ful w-full object-cover"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Distance</dt>

            {isDistance && (
              <dd className="text-sm text-gray-500">
                {feature.properties.distance}km away
              </dd>
            )}
          </div>

          <div>
            <dt className="sr-only">Address</dt>

            <dd className="font-medium">{feature.properties.Type}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

export default Place;
