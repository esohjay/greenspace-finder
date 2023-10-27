import React from "react";
import ListGroup from "@/components/listGroup";
import BackBtn from "@/components/backBtn";
import Link from "next/link";
import {
  FaXTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa6";

function Share() {
  return (
    <main className="grid place-items-center">
      <section className="w-full min-h-screen  max-w-lg bg-white">
        <header className=" pb-5 pt-7 bg-mainColor px-5">
          <div className="flex justify-between items-center">
            <BackBtn />
            <h3 className="text-white text-center font-semibold text-lg">
              Share with friends
            </h3>
            <div></div>
          </div>
        </header>

        <section>
          <a
            target="_blank"
            href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}&text=Check%20out%20this%20amazing%20website.%20It%20helps%20you%20locate%20greenspaces%20around%20you.`}
          >
            <ListGroup
              icon={FaXTwitter}
              text="Twitter (X)"
              isDetailed={true}
              iconColor="text-gray-500"
              textColorAndSize="text-mainColor"
            />
          </a>
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?text=Check%20out%20this%20amazing%20website.%20It%20helps%20you%20locate%20greenspaces%20around%20you. %20${process.env.NEXT_PUBLIC_SITE_URL}`}
          >
            <ListGroup
              icon={FaWhatsapp}
              text="Whatsapp"
              isDetailed={true}
              iconColor="text-gray-500"
              textColorAndSize="text-mainColor"
            />
          </a>
          <a
            target="_blank"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_SITE_URL}`}
          >
            <ListGroup
              icon={FaLinkedin}
              text="LinkedIn"
              isDetailed={true}
              iconColor="text-gray-500"
              textColorAndSize="text-mainColor"
            />
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}`}
          >
            <ListGroup
              icon={FaFacebookF}
              text="Facebook"
              isDetailed={true}
              iconColor="text-gray-500"
              textColorAndSize="text-mainColor"
            />
          </a>
        </section>
      </section>
    </main>
  );
}

export default Share;
