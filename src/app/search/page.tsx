import React from "react";
import Link from "next/link";
import CategoryList from "./categoryList";
import ListGroup from "@/components/listGroup";
import { MdOutlineCalendarMonth } from "react-icons/md";
// import { selectCategories } from "@/redux/features/mapSlice";
// import { useAppSelector } from "@/redux/hooks";

function Search() {
  // const categories = useAppSelector(selectCategories);
  return (
    <section>
      <header className=" bg-mainColor w-full p-10 space-y-6">
        {/* <h3 className="px-2 py-1 border-4 border-white text-white font-extrabold inline-block mt-10">
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
    </button> */}
      </header>
      <section className="pl-5 py-5 w-full">
        <Link
          href={"/places"}
          className="text-mainColor font-semibold block pb-3 border-b border-gray-200"
        >
          All activities nearby
        </Link>
        <article>
          <Link
            href={"/places"}
            className="text-mainColor font-semibold block py-3 border-b border-gray-200"
          >
            Places
          </Link>
          <CategoryList />
        </article>
        <article>
          <Link
            href={"/places"}
            className="text-mainColor font-semibold block py-3 border-b border-gray-200"
          >
            Events
          </Link>
          <ListGroup icon={MdOutlineCalendarMonth} text="Today" />
          <ListGroup icon={MdOutlineCalendarMonth} text="Tomorrow" />
          <ListGroup icon={MdOutlineCalendarMonth} text="This week" />
          <ListGroup icon={MdOutlineCalendarMonth} text="This weekend" />
        </article>
      </section>
    </section>
  );
}

export default Search;
