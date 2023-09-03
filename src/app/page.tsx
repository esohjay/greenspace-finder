import MapContainer from "@/components/map";
import MapDisplay from "@/components/mapDisplay";
import Items from "./places/items";
import Link from "next/link";
// import N from ''
import CircleImage from "@/components/circleImage";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
export default function Home() {
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
          <div className="absolute bg-black w-full h-full rounded-xl bg-opacity-30">
            <p className="text-whitez">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              iusto.
            </p>
          </div>
        </figure>
      </article>
      <div className="flex flex-nowrap gap-x-5 w-ful py-5 overflow-x-scroll px-5">
        <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
        <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
        <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
        <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
        <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
        <CircleImage text="places" src="/images/ugs-with-fam.jpg" />
      </div>
      {/* <div className="h-[350px] w-[350px] p-2">
        <MapContainer
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div>
      <Link href={"places"}>places</Link> */}
    </main>
  );
}
