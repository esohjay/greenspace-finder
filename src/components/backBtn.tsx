"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-block text-2xl text-white"
    >
      <FaArrowLeft />
    </button>
  );
}

export default BackBtn;
