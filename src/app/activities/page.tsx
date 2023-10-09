import React from "react";
import Activity from "@/components/activity";
import { thingsToDo } from "@/lib/data";

function Activities() {
  return (
    <main className="grid place-items-center">
      <section className="bg-gray-100 max-w-lg min-h-screen">
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
