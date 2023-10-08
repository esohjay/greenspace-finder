"use client";
import React, { useRef, useState, useEffect } from "react";
import { selectFeatureTypes } from "@/redux/features/mapSlice";
import { useAppSelector } from "@/redux/hooks";
import ListGroup from "@/components/listGroup";
import { MdLocationPin } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CategoryList() {
  const router = useRouter();
  const featureTypes = useAppSelector(selectFeatureTypes);
  const [fullList, setFullList] = useState(false);
  const linksContainerRef = useRef<HTMLDivElement>(null!);
  const linksRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    if (featureTypes && featureTypes.length) {
      const linksHeight = linksRef.current.getBoundingClientRect().height;
      if (fullList) {
        linksContainerRef.current.style.height = `${
          linksHeight * featureTypes.length
        }px`;
      } else {
        linksContainerRef.current.style.height = `${linksHeight * 3}px`;
      }
    }
  }, [fullList, featureTypes]);
  return (
    <article>
      <div
        ref={linksContainerRef}
        className="overflow-hidden transition-all duration-300"
      >
        {featureTypes && featureTypes.length > 0 ? (
          featureTypes?.map((type) => (
            <div
              ref={linksRef}
              key={type}
              onClick={() => router.push(`places?type=${type}`)}
              className="hover:cursor-pointer"
            >
              <ListGroup
                icon={MdLocationPin}
                text={type}
                isDetailed={false}
                iconColor="text-gray-300"
                textColorAndSize="text-[15px]"
              />
            </div>
          ))
        ) : (
          <div
            onClick={() => router.push(`places`)}
            className="hover:cursor-pointer"
          >
            <ListGroup
              icon={MdLocationPin}
              text={"View all"}
              isDetailed={false}
              iconColor="text-gray-300"
              textColorAndSize="text-[15px]"
            />
          </div>
        )}
      </div>
      {featureTypes?.length >= 3 && (
        <button
          onClick={() => {
            setFullList(!fullList);
          }}
          className="text-gray-500 pl-8"
        >
          {fullList ? "Less" : "More"}
        </button>
      )}
    </article>
  );
}

export default CategoryList;
