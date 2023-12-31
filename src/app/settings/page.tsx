import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RiFeedbackLine, RiQuestionLine } from "react-icons/ri";
import ListGroup from "@/components/listGroup";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SignOutBtn from "@/components/signOutBtn";
import Link from "next/link";
async function getData() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const id = session?.user.id!;
  const { data } = await supabase.from("profiles").select().eq("id", id);
  const userData = data!;
  console.log(userData[0]);
  return { ...userData[0], email: session?.user.email };
}

async function Settings() {
  const data = await getData();
  return (
    <main className="grid place-items-center">
      <section className="w-full max-w-lg bg-white">
        <header className=" pb-5 pt-7 bg-mainColor text-white text-center font-semibold text-lg">
          Settings
        </header>
        <section>
          <article className="p-5 bg-gray-100 text-gray-600 text-lg">
            My Account
          </article>
          <Link
            href={"/account"}
            className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center"
          >
            <div>
              <p className="text-mainColor font-medium">{`${data.first_name} ${data.last_name}`}</p>
              <p className="text-mainColor font-medium text-sm">{data.email}</p>
            </div>
            <button className="text-xl text-gray-500">
              <MdOutlineKeyboardArrowRight />
            </button>
          </Link>
        </section>
        <section>
          <article className="p-5 bg-gray-100 text-gray-600 text-lg">
            Preferences
          </article>
          <Link
            href={"/location?prev=settings"}
            className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center"
          >
            <div>
              <Link
                href={"/location?prev=settings"}
                className="text-mainColor font-medium block"
              >
                Home location
              </Link>
            </div>
            <button className="text-xl text-gray-500">
              <MdOutlineKeyboardArrowRight />
            </button>
          </Link>
          <Link
            href={"/account"}
            className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center"
          >
            <div>
              <p className="text-mainColor font-medium">Units</p>
            </div>
            <span className="flex items-center capitalize text-sm text-gray-500 gap-x-1">
              <p>{data.unit}</p>
              <button className="text-xl text-gray-500">
                <MdOutlineKeyboardArrowRight />
              </button>
            </span>
          </Link>
          <Link
            href={"/account"}
            className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center"
          >
            <div>
              <p className="text-mainColor font-medium">Search radius</p>
            </div>
            <span className="flex items-center capitalize text-sm text-gray-500 gap-x-1">
              <p>
                {data.search_radius} {data.unit}
              </p>
              <button className="text-xl text-gray-500">
                <MdOutlineKeyboardArrowRight />
              </button>
            </span>
          </Link>
        </section>
        <section>
          <article className="p-5 bg-gray-100 text-gray-600 text-lg">
            More
          </article>
          <Link href="/share" className="block">
            <ListGroup
              icon={FaUserFriends}
              text="Share with friends"
              isDetailed={true}
              iconColor="text-gray-500"
              textColorAndSize="text-mainColor"
            />
          </Link>
          {/* <ListGroup
            icon={RiFeedbackLine}
            text="Send us feedback"
            isDetailed={true}
            iconColor="text-gray-500"
            textColorAndSize="text-mainColor"
          /> */}
          <Link href="/help" className="block">
            <ListGroup
              icon={RiQuestionLine}
              text="Help"
              isDetailed={true}
              iconColor="text-gray-500"
              textColorAndSize="text-mainColor"
            />
          </Link>
        </section>
        <section>
          <article className="p-5 bg-gray-100 text-gray-600 text-lg"></article>
          <article className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center">
            <div>
              {/* <p className="text-altColor font-medium">Logout</p> */}
              <SignOutBtn />
            </div>
          </article>
          <Link
            href="/about"
            className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center"
          >
            <div>
              <p className="text-mainColor font-medium">About</p>
            </div>
            <span className="flex items-center text-sm text-gray-500 gap-x-1">
              <button className="text-xl text-gray-500">
                <MdOutlineKeyboardArrowRight />
              </button>
            </span>
          </Link>
        </section>
      </section>
    </main>
  );
}

export default Settings;
