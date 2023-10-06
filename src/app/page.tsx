import Item from "@/components/item";
import Link from "next/link";
// import N from ''
import CircleImage from "@/components/circleImage";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiMapTrifoldFill } from "react-icons/pi";
import Place from "@/components/placeSample";
import FeaturedPlaces from "@/components/home/featuredPlaces";
import useGetSession from "@/hooks/useGetSession";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
async function getData() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session?.user);
  const id = session?.user.id!;
  const { data } = await supabase.from("profiles").select().eq("id", id);
  const userData = data!;
  return userData;
  // const res = await fetch(
  //   `http://localhost:3000/auth/api?id=${session?.user.id}`
  // );
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();
}
export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // const userId = session?.user.id!;
  const data = await getData();
  // console.log(data, "page");
  return (
    <main className="">
      <header className=" bg-mainColor w-full p-5 space-y-6">
        <h3 className="px-2 py-1 border-4 border-white text-white font-extrabold inline-block mt-10">
          GreenExplorer
        </h3>
        <h2 className="text-white font-extrabold text-3xl">Explore</h2>
        <button
          className="flex justify-between w-full text-white items-center px-3 py-2 bg-secondary
           rounded-md"
        >
          <span className="flex gap-x-2 items-center">
            <IoLocationSharp />
            <p>Home</p>
          </span>
          <MdOutlineArrowDropDown className="text-2xl" />
        </button>
        <Item />
      </header>
      <article className="w-full h-44 grid place-items-center mt-8 px-5">
        <figure className="w-full h-full relative rounded-md">
          <Image
            src={"/images/ugs-with-fam.jpg"}
            alt="ugs with family"
            // width={200}
            // height={200}
            fill
            className="rounded-xl"
          />
          <div className="absolute bg-black w-full flex flex-col justify-center gap-y-2 text-white items-center h-full rounded-xl bg-opacity-30">
            <h3 className="font-bold text-2xl">Explore further</h3>
            <p className="text-white font-semibold">
              Get kitted out for your next walk
            </p>
            <button className="bg-altColor px-5 py-2 rounded-sm font-semibold">
              Visit our shop
            </button>
          </div>
        </figure>
      </article>

      <FeaturedPlaces user={data[0]} />
      <article className="px-5 py-8 bg-gray-100">
        <article className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-mainColor">Places</h3>
          <Link
            href={"places"}
            className="text-altColor font-semibold text-sm block"
          >
            See all
          </Link>
        </article>
        <figure className="flex overflow-x-scroll py-5 gap-x-3 ">
          <Place type="Playground" dist="8" />
          <Place type="Park" dist="8" />
          <Place type="Playground" dist="8" />
          <Place type="Cementry" dist="8" />
          <Place type="Playground" dist="8" />
          <Place type="Play field" dist="8" />
        </figure>
        <div className="my-5  h-[1px] bg-gray-300"></div>
        <p className="text-gray-400">Found a missing place?</p>
        <Link
          href={"places"}
          className="text-mainColor font-semibold text-sm block"
        >
          Add place
        </Link>
      </article>
      <article className="px-5 py-8 ">
        <article className="flex justify-between  items-center ">
          <div>
            <h3 className="font-bold mb-1 text-xl text-mainColor">
              Things to do
            </h3>
            <p className="text-sm  font-medium text-gray-500">
              Free activities to do near you
            </p>
          </div>
          <Link
            href={"places"}
            className="text-altColor font-semibold text-sm block"
          >
            See all
          </Link>
        </article>
        <figure className="flex overflow-x-scroll py-5 gap-x-3 ">
          <Place type="Playground" dist="8" />
          <Place type="Park" dist="8" />
          <Place type="Playground" dist="8" />
          <Place type="Cementry" dist="8" />
          <Place type="Playground" dist="8" />
          <Place type="Play field" dist="8" />
        </figure>
      </article>
      <article className="px-5 py-8 bg-gray-100">
        <article className="flex justify-between  items-center ">
          <div>
            <h3 className="font-bold mb-1 text-xl text-mainColor">
              Get inspired
            </h3>
            <p className="text-sm  font-medium text-gray-500">
              Articles to help you get outside
            </p>
          </div>
          <Link
            href={"places"}
            className="text-altColor font-semibold text-sm block"
          >
            Visit website
          </Link>
        </article>
        <figure className="flex overflow-x-scroll py-5 gap-x-3 ">
          <Place type="Playground" dist="8" />
          <Place type="Park" dist="8" />
          <Place type="Playground" dist="8" />
          <Place type="Cementry" dist="8" />
          <Place type="Playground" dist="8" />
          <Place type="Play field" dist="8" />
        </figure>
      </article>
      <article className="grid grid-cols-[2fr_1fr] bg-mainColor gap-x-3 pt-8 pb-20 px-5 place-items-center">
        <div>
          <h3 className="font-bold text-white mb-3 text-xl">
            Add place or event
          </h3>
          <p className="text-gray-200 mb-3">
            Add missing places or create public/private events and share them
            with friends.
          </p>
          <button className="px-3 py-1 text-white bg-altColor rounded-md">
            Add new
          </button>
        </div>
        <div className="w-24 h-24 rounded-full">
          <figure className="w-full h-full block relative rounded-full">
            <Image
              src="/images/ugs-with-fam.jpg"
              alt="ugs with family"
              fill
              className="rounded-full"
            />
          </figure>
        </div>
      </article>
      <div className="text-center fixed w-full left-0 bottom-[92px]">
        <Link className="inline-block " href={"map"}>
          <span className="flex  gap-x-2 items-center text-cente py-3 px-6 bg-secondaryColor text-xl font-bold text-white rounded-full">
            <PiMapTrifoldFill className="text-2xl" /> <p>Map</p>
          </span>
        </Link>
      </div>
    </main>
  );
}
