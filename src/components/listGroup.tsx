import React from "react";
import { IconType } from "react-icons";

interface propsType {
  icon: IconType;
  text: string;
}

function ListGroup({ icon: Icon, text }: propsType) {
  return (
    <article className="w-full py-3 border-b border-b-gray-200 pr-1">
      <div className="flex items-center gap-x-2 ">
        <button>
          <Icon className="text-gray-300 text-2xl" />
        </button>
        <p className="first-letter:capitalize text-[15px]">{text}</p>
      </div>
    </article>
  );
}

export default ListGroup;
