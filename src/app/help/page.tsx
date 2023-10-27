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
              Help
            </h3>
            <div></div>
          </div>
        </header>

        <article className="p-5">
          <h3 className="text-mainColor font-semibold text-2xl mb-5">
            Need help?
          </h3>
          <p className="text-secondaryColor mb-3">
            We are always always happy to help. Kindly use the contact
            information below to get in touch with us.
          </p>
          <Link href="tel:+447856422070" className="text-altColor mb-2 block">
            {" "}
            <span className="text-secondaryColor font-medium">Phone:</span>{" "}
            +447856422070
          </Link>
          <Link
            href="mailto:olusoji.webdev3766@gmail.com"
            className="text-altColor mb-2 block"
          >
            {" "}
            <span className="text-secondaryColor font-medium">Email:</span>{" "}
            olusoji.webdev3766@gmail.com
          </Link>
        </article>
      </section>
    </main>
  );
}

export default Share;
