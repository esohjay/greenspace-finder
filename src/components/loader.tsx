import React from "react";

type propType = {
  text: string;
};
function Loader({ text }: propType) {
  return (
    <div className="flex items-center gap-4 justify-center py-5 ">
      <div className="w-12 h-12 border-l-2 border-mainColor rounded-full animate-spin"></div>
      <p className="font-semi-bold text-mainColor">{text}</p>
    </div>
  );
}
export default Loader;
