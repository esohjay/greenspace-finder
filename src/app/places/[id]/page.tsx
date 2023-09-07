import React from "react";
import Image from "next/image";
import SingleGreenSpace from "./singlePlace";
import { MdOutlinedFlag } from "react-icons/md";

function SinglePlace() {
  return (
    <section className="bg-gray-100">
      <figure className=" w-full h-[250px] relative">
        <Image
          alt="Home"
          fill
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full object-cover"
        />
      </figure>
      <article className="p-5 bg-white shadow mb-5">
        <article className="border-b border-gray-200  ">
          <p className="text-xl font-semibold mb-1 text-mainColor">
            Playground
          </p>
          <p className="text-gray-500 mb-3">Playground</p>
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
      <article className="w-full h-64 bg-gray-400"></article>
      <article className="flex items-start gap-x-3 py-5 pl-5 bg-white shadow">
        <button className="text-2xl">
          <MdOutlinedFlag className="text-altColor" />
        </button>
        <article className="w-full">
          <div className="border-b pb-5">
            <p className=" text-mainColor mb-1">Greater Manchester</p>
            <p className="text-altColor">Get directions</p>
          </div>
          <div className="border-b pb-5">
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
      <SingleGreenSpace />
    </section>
  );
}

export default SinglePlace;
