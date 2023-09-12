"use client";
import React, { useRef, useState, useEffect } from "react";
import { selectCategories } from "@/redux/features/mapSlice";
import { useAppSelector } from "@/redux/hooks";
import ListGroup from "@/components/listGroup";
import { MdLocationPin } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CategoryList() {
  const router = useRouter();
  const categories = useAppSelector(selectCategories);
  const [fullList, setFullList] = useState(false);
  const linksContainerRef = useRef<HTMLDivElement>(null!);
  const linksRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linksHeight);
    if (fullList) {
      linksContainerRef.current.style.height = `${
        linksHeight * categories.length
      }px`;
    } else {
      linksContainerRef.current.style.height = `${linksHeight * 3}px`;
    }
  }, [fullList, categories]);
  return (
    <article>
      <div
        ref={linksContainerRef}
        className="overflow-hidden transition-all duration-300"
      >
        {categories?.map((category) => (
          <div
            ref={linksRef}
            key={category}
            onClick={() => router.push(category)}
            className="hover:cursor-pointer"
          >
            <ListGroup
              icon={MdLocationPin}
              text={category}
              isDetailed={false}
              iconColor="text-gray-300"
              textColorAndSize="text-[15px]"
            />
          </div>
        ))}
      </div>
      {categories?.length >= 3 && (
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
