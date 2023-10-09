"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleGreenSpace from "./singlePlace";
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
import { setImgUrl } from "@/lib/data";

function SinglePlace({ user }: { user: Profile }) {
  const { getSingleFeature } = useFetchFeatures();
  const [place, setPlace] = useState<GeoJSONFeatureCollection | null>(null);
  const [imgUrl, setImgUrl] = useState(
    "https://cdn.pixabay.com/photo/2017/09/20/06/27/bridge-2767545_1280.jpg"
  );
  const { placeId } = useParams();
  const [saveLocation] = useEditUserMutation();
  useEffect(() => {
    const getFeature = async () => {
      const feature = await getSingleFeature(placeId);
      setPlace(feature);
      setImgUrl(feature.features[0].properties.Type);
    };
    if (!place) {
      getFeature();
    }
  }, [place, getSingleFeature, placeId, imgUrl]);
  console.log(user.saved_places);
  const savePlace = () => {
    let savedPlaces = user.saved_places + placeId + "|";
    if (savedPlaces) {
    }
    saveLocation({ ...user, saved_places: savedPlaces });
  };
  return (
    <section className="bg-gray-100">
      <figure className=" w-full h-[250px] relative">
        <Image
          alt="Home"
          fill
          src={imgUrl}
          className="h-full w-full object-cover"
        />
      </figure>
      <article className="p-5 bg-white shadow mb-3">
        <article className="border-b border-gray-200  ">
          <p className="text-xl font-semibold mb-1 text-mainColor">
            {place?.features[0]?.properties.Type}
          </p>
          <p className="text-gray-500 mb-3">
            {place?.features[0]?.properties.Type}
          </p>
        </article>
        <article className="pt-2  mx-5">
          <p className="text-gray-500">Provided by</p>
          <button className="block h-6 w-20 rounded-sm relative ">
            <Image
              alt="Home"
              fill
              src="/images/ordnance-survey-vector-logo.svg"
              className="h-full w-full object-cover"
            />
          </button>
        </article>
      </article>
      {/* <article className="w-full h-64 bg-gray-400"></article> */}
      {place && (
        <div className="h-64 w-full">
          <SingleMapDisplay
            mapOptions={{
              basemap: "streets-vector",
            }}
            feature={place.features[0]}
          />
        </div>
      )}
      <article className="flex items-start gap-x-3 py-5 pl-5 bg-white shadow mb-3">
        <button className="text-2xl">
          <MdOutlinedFlag className="text-altColor" />
        </button>
        <article className="w-full">
          <div className="border-b pb-5">
            <p className=" text-mainColor mb-1">Save this facility for later</p>
            <button
              onClick={savePlace}
              className="text-white bg-altColor inline-block round px-6 py-3"
            >
              Save
            </button>
          </div>
          <div className="">
            <p className=" text-gray-500 my-3">Facilities nearby</p>
            <div className="flex gap-x-2">
              <button className="rounded block text-mainColor py-2 px-4 border border-gray-200">
                Pub
              </button>
              <button className="rounded block text-mainColor py-2 px-4 border border-gray-200">
                Playground
              </button>
              <button className="rounded block text-mainColor py-2 px-4 border border-gray-200">
                Cafe
              </button>
            </div>
          </div>
        </article>
      </article>
      <article className="flex items-start gap-x-3 py-5 pl-5 bg-white shadow mb-3">
        <button className="text-2xl">
          <BsChatSquareText className="text-altColor" />
        </button>
        <article className="w-full">
          <div className="border-b pb-5">
            <p className=" text-mainColor mb-1">Reviews</p>
            <p className="text-gray-500">
              No ratings yet. Be first and rate below!
            </p>
          </div>
          <div className="">
            <p className=" text-gray-500 my-3">Tap to rate</p>
            <div className="flex gap-x-2">
              <button className="block text-mainColor border-none outline-none text-3xl">
                <MdStarOutline />
              </button>
              <button className="block text-mainColor border-none outline-none text-3xl">
                <MdStarOutline />
              </button>
              <button className="block text-mainColor border-none outline-none text-3xl">
                <MdStarOutline />
              </button>
              <button className="block text-mainColor border-none outline-none text-3xl">
                <MdStarOutline />
              </button>
              <button className="block text-mainColor border-none outline-none text-3xl">
                <MdStarOutline />
              </button>
            </div>
          </div>
        </article>
      </article>
      <article className="flex items-center gap-x-3 py-5 pl-5 bg-white shadow mb-3">
        <button className="text-2xl">
          <MdOutlinePhotoCamera className="text-altColor" />
        </button>
        <article className="w-full flex justify-between items-center">
          <p className="text-mainColor">Add photo</p>
          <button className="text-2xl">
            <MdChevronRight className="text-gray-500" />
          </button>
        </article>
      </article>
      <article className="p-5 bg-white shadow mb-3">
        <article className="flex gap-x-3">
          <button className="text-2xl">
            <HiOutlineLightBulb className="text-altColor" />
          </button>
          <p className="text-mainColor mb-1">Free activities to do here</p>
        </article>
        <figure className="flex overflow-x-scroll py-5 gap-x-3 ">
          {thingsToDo.map((activity) => (
            <Activity
              key={activity.id}
              text={activity.title}
              imgUrl={activity.imgUrl}
              link={`/activities/${activity.id}`}
            />
          ))}
        </figure>
      </article>
      {/* <SingleGreenSpace /> */}
    </section>
  );
}

export default SinglePlace;
