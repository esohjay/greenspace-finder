import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RiFeedbackLine, RiQuestionLine } from "react-icons/ri";
import ListGroup from "@/components/listGroup";

function Settings() {
  return (
    <section>
      <header className=" pb-5 pt-7 bg-mainColor text-white text-center font-semibold text-lg">
        Settings
      </header>
      <section>
        <article className="p-5 bg-gray-100 text-gray-600 text-lg">
          My Account
        </article>
        <article className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center">
          <div>
            <p className="text-mainColor font-medium">Olusoji Daramola</p>
            <p className="text-mainColor font-medium text-sm">
              oluseye.olusoji@gmail.com
            </p>
          </div>
          <button className="text-xl text-gray-500">
            <MdOutlineKeyboardArrowRight />
          </button>
        </article>
      </section>
      <section>
        <article className="p-5 bg-gray-100 text-gray-600 text-lg">
          Preferences
        </article>
        <article className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center">
          <div>
            <p className="text-mainColor font-medium">Home location</p>
          </div>
          <button className="text-xl text-gray-500">
            <MdOutlineKeyboardArrowRight />
          </button>
        </article>
        <article className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center">
          <div>
            <p className="text-mainColor font-medium">Units</p>
          </div>
          <span className="flex items-center text-sm text-gray-500 gap-x-1">
            <p>Miles</p>
            <button className="text-xl text-gray-500">
              <MdOutlineKeyboardArrowRight />
            </button>
          </span>
        </article>
      </section>
      <section>
        <article className="p-5 bg-gray-100 text-gray-600 text-lg">
          More
        </article>
        <ListGroup
          icon={FaUserFriends}
          text="Share with friends"
          isDetailed={true}
          iconColor="text-gray-500"
          textColorAndSize="text-mainColor"
        />
        <ListGroup
          icon={RiFeedbackLine}
          text="Send us feedback"
          isDetailed={true}
          iconColor="text-gray-500"
          textColorAndSize="text-mainColor"
        />
        <ListGroup
          icon={RiQuestionLine}
          text="Help"
          isDetailed={true}
          iconColor="text-gray-500"
          textColorAndSize="text-mainColor"
        />
      </section>
      <section>
        <article className="p-5 bg-gray-100 text-gray-600 text-lg"></article>
        <article className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center">
          <div>
            <p className="text-altColor font-medium">Logout</p>
          </div>
        </article>
        <article className="px-5 py-3 text-gray-600 text-lg flex justify-between items-center">
          <div>
            <p className="text-mainColor font-medium">About</p>
          </div>
          <span className="flex items-center text-sm text-gray-500 gap-x-1">
            <button className="text-xl text-gray-500">
              <MdOutlineKeyboardArrowRight />
            </button>
          </span>
        </article>
      </section>
    </section>
  );
}

export default Settings;
