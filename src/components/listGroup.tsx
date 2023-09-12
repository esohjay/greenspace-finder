import React from "react";
import { IconType } from "react-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface propsType {
  icon: IconType;
  text: string;
  isDetailed: boolean;
  iconColor: string;
  textColorAndSize: string;
}

function ListGroup({
  icon: Icon,
  text,
  isDetailed,
  textColorAndSize,
  iconColor,
}: propsType) {
  return (
    <article
      className={`w-full py-3 flex justify-between items-center  ${
        isDetailed ? "px-5" : "border-b border-b-gray-200 pr-1"
      }`}
    >
      <div className="flex items-center gap-x-2 ">
        <button>
          <Icon className={` text-2xl ${iconColor}`} />
        </button>
        <p className={`first-letter:capitalize  ${textColorAndSize} `}>
          {text}
        </p>
      </div>
      {isDetailed && (
        <button className="text-xl text-gray-500">
          <MdOutlineKeyboardArrowRight />
        </button>
      )}
    </article>
  );
}

export default ListGroup;
