"use client";
import Image from "next/image";

import { thingsToDo } from "@/lib/data";
import SingleMapDisplay from "@/components/singlePlaceMap";
import useFetchFeatures from "@/hooks/useFetchFeatures";
import { useParams } from "next/navigation";
import { GeoJSONFeatureCollection } from "@/types/features";
import { useEditUserMutation, useGetUserQuery } from "@/redux/services";

import {
  MdOutlinedFlag,
  MdStarOutline,
  MdOutlinePhotoCamera,
  MdChevronRight,
  MdStarHalf,
  MdStar,
} from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Profile } from "@/types/user";

import Activity from "@/components/activity";

function SinglePlace() {
  const { id } = useParams();
  const activity = thingsToDo.find((activity) => activity.id === id);
  return (
    <main className="grid place-items-center">
      <section className="bg-gray-100 max-w-lg min-h-screen">
        <figure className=" w-full h-[250px] relative">
          {activity && (
            <Image
              alt="Home"
              fill
              src={activity?.imgUrl}
              className="h-full w-full object-cover"
            />
          )}
        </figure>
        <article className="p-5 bg-white shadow mb-3">
          <h3 className="font-semibold text-mainColor text-xl mb-3">
            {activity?.title}
          </h3>
          <p className="text-mainColor">{activity?.description}</p>
        </article>
      </section>
    </main>
  );
}

export default SinglePlace;
