import React from "react";
import Activity from "@/components/activity";
import { thingsToDo } from "@/lib/data";
import BackBtn from "@/components/backBtn";

function Activities() {
  return (
    <main className="grid place-items-center">
      <section className="w-full min-h-screen  max-w-lg bg-white">
        <header className=" pb-5 pt-7 bg-mainColor px-5">
          <div className="flex justify-between items-center">
            <BackBtn />
            <h3 className="text-white text-center font-semibold text-lg">
              Activities
            </h3>
            <div></div>
          </div>
        </header>
        <figure className="flex flex-wrap py-5 gap-5 justify-center items-center ">
          {thingsToDo.map((activity) => (
            <Activity
              key={activity.id}
              text={activity.title}
              imgUrl={activity.imgUrl}
              link={`/activities/${activity.id}`}
            />
          ))}
        </figure>
      </section>
    </main>
  );
}

export default Activities;
