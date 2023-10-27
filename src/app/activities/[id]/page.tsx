"use client";
import Image from "next/image";

import { thingsToDo } from "@/lib/data";
import BackBtn from "@/components/backBtn";
import { useParams } from "next/navigation";

function SinglePlace() {
  const { id } = useParams();
  const activity = thingsToDo.find((activity) => activity.id === id);
  return (
    <main className="grid place-items-center">
      <section className="w-full min-h-screen  max-w-lg bg-white">
        <header className=" pb-5 pt-7 bg-mainColor px-5">
          <div className="flex justify-between items-center">
            <BackBtn />
            <h3 className="text-white text-center font-semibold text-lg">
              {activity?.title}
            </h3>
            <div></div>
          </div>
        </header>
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
        <article className="p-5 bg-white mb-3">
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
