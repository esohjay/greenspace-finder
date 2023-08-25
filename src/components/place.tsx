import React from "react";
import { GeoJSONFeature } from "@/types/features";
import Image from "next/image";
import Link from "next/link";

type propType = {
  feature: GeoJSONFeature;
};
function Place({ feature }: propType) {
  return (
    <Link href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
      <Image
        alt="Home"
        width={200}
        height={200}
        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Distance</dt>

            <dd className="text-sm text-gray-500">
              {feature.properties.distance}km away
            </dd>
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
