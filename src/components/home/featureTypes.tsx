"use client";
import React, { useEffect, useState } from "react";
import CircleImage from "../circleImage";

import { Profile } from "@/types/user";
import { useAppSelector } from "@/redux/hooks";
import { selectFeatureTypes } from "@/redux/features/mapSlice";

function FeaturedTypes() {
  const featureTypes = useAppSelector(selectFeatureTypes);
  return (
    <figure className="flex w-full  justify-start overflow-x-scroll px-5 py-10 gap-x-6">
      {/* {featureTypes.map((type) => (
        <CircleImage key={type} text={type} src="/images/ugs-with-fam.jpg" />
      ))} */}
      <CircleImage text={"Public park"} src="/images/ugs-with-fam.jpg" />
      <CircleImage text={"Play space"} src="/images/ugs-with-fam.jpg" />
      <CircleImage text={"Playing field"} src="/images/ugs-with-fam.jpg" />
      <CircleImage text={"Bowling green"} src="/images/ugs-with-fam.jpg" />
      <CircleImage text={"Tennis court"} src="/images/ugs-with-fam.jpg" />
    </figure>
  );
}

export default FeaturedTypes;
