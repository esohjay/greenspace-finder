"use client";
import React, { useEffect, useState } from "react";
import LocationMap from "@/components/locationMap";
import { FaSearchLocation } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  addressToLocations,
  locationToAddress,
} from "@arcgis/core/rest/locator";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import AddressModal from "@/components/addressModal";

type Inputs = {
  address: string;
};

function Location() {
  const dispatch = useAppDispatch();
  const [addressList, setAddressList] = useState<
    __esri.AddressCandidate[] | null
  >(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const getAddress = async (address: string) => {
    const geocodingServiceUrl = `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?&f=json&outFields=PlaceName&token=${process.env.NEXT_PUBLIC_ARCGIS_APIKEY}`;
    const params = {
      address: {
        address: "1600 Pennsylvania Ave NW, DC",
      },
    };
    const addresses = await addressToLocations(geocodingServiceUrl, params);
    for (let a of addresses) {
      console.log(a.toJSON());
    }
    return addresses;
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const geocodingServiceUrl = `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?&f=json&token=${process.env.NEXT_PUBLIC_ARCGIS_APIKEY}`;
    const params: __esri.locatorAddressToLocationsParams = {
      address: {
        address: data.address,
      },

      outSpatialReference: SpatialReference.WebMercator, //{ wkid: 3857 }
    };
    const addresses = await addressToLocations(geocodingServiceUrl, params);

    setAddressList(addresses);
  };
  // useEffect(() => {
  // }, [dispatch]);
  console.log(addressList);
  return (
    <section>
      <article className="p-5 bg-mainColor text-white">
        <h3 className="text-center mb-3 text-lg font-bold">Select location</h3>
        <form
          className="flex gap-x-3 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            {...register("address")}
            className="w-full bg-secondaryColor p-2 rounded"
          />
          <button className="text-white text-xl ">
            <FaSearchLocation />
          </button>
        </form>
      </article>
      <div className="h-[350px] w-full p-2">
        <LocationMap
          mapOptions={{
            basemap: "streets-vector",
          }}
        />
      </div>
      {addressList && <AddressModal addressCandidate={addressList} />}
    </section>
  );
}

export default Location;
