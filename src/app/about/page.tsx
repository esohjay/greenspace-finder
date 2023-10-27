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
              About
            </h3>
            <div></div>
          </div>
        </header>

        <article className="p-5">
          <p className="text-secondaryColor mb-2 text-sm md:text-base">
            Greenspace explorer helps you find greenspaces around your area. The
            inspiration for this website was gotten from the GetOutside mobile
            app developed by Ordnance survey. Greenspace data is provided by{" "}
            <a
              target="_blank"
              href="https://osdatahub.os.uk"
              className="text-altColor"
            >
              Ordnance Survey
            </a>{" "}
            datahub while the map is powered by{" "}
            <a
              target="_blank"
              href="https://developers.arcgis.com/javascript/latest/"
              className="text-altColor"
            >
              ArcGIS Maps SDK for JS.
            </a>
          </p>
          <p className="text-secondaryColor mb-2 text-sm md:text-base font-medium">
            This is the Alpha version, the stable version is in progress.
          </p>
          <Link
            href="https://www.olusojidaramola.tech/"
            className="text-altColor mb-2 block"
          >
            {" "}
            <span className="text-secondaryColor font-medium">
              Developed by:
            </span>{" "}
            Olusoji Daramola
          </Link>
          <Link
            href="https://www.olusojidaramola.tech/"
            className="text-altColor mb-2 block"
          >
            {" "}
            Check out other projects at{" "}
            <span className="underline">olusojidaramola.tech</span>
          </Link>

          <h3 className="text-mainColor font-semibold text-2xl mb-5">
            Data privacy
          </h3>
          <p className="text-secondaryColor mb-2 text-sm md:text-base">
            We use your personal data to provide you personalized experience on
            the website and also for authentication.{" "}
          </p>
        </article>
      </section>
    </main>
  );
}

export default Share;
