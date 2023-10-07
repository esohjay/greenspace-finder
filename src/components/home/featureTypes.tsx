"use client";
import React, { useEffect, useState } from "react";
import CircleImage from "../circleImage";

import { Profile } from "@/types/user";
import { useAppSelector } from "@/redux/hooks";
import { selectFeatureTypes } from "@/redux/features/mapSlice";

function FeaturedTypes() {
  const featureTypes = useAppSelector(selectFeatureTypes);
  return (
    <figure className="flex justify-evenly overflow-x-scroll px-5 py-10 gap-x-3">
      {featureTypes.map((type) => (
        <CircleImage key={type} text={type} src="/images/ugs-with-fam.jpg" />
      ))}
    </figure>
  );
}

export default FeaturedTypes;
