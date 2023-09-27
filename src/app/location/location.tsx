"use client";
import React, { useEffect, useState } from "react";
import LocationMap from "@/components/locationMap";
import { FaSearchLocation } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { selectMapCenterCoordinates } from "@/redux/features/mapSlice";
import {
  addressToLocations,
  locationToAddress,
} from "@arcgis/core/rest/locator";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import AddressModal from "@/components/addressModal";
import {
  setAddressModalState,
  selectAddressModalState,
} from "@/redux/features/appSlice";
import { Database } from "@/types/supabase";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { setStatus, selectStatus } from "@/redux/features/authSlice";

type Inputs = {
  address: string;
};

function Location({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const user = session?.user;
  console.log(session);
  const userCoordinates = useAppSelector(selectMapCenterCoordinates);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectAddressModalState);
  const [addressList, setAddressList] = useState<
    __esri.AddressCandidate[] | null
  >(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  async function saveUserLocation() {
    try {
      dispatch(setStatus("loading"));
      let { error, data } = await supabase
        .from("profiles")
        .update({
          location: `POINT(${userCoordinates?.long} ${userCoordinates?.lat})`,
        })
        .eq("id", `${user?.id}`);
      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    } finally {
      dispatch(setStatus("idle"));
    }
  }
  console.log(userCoordinates);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const geocodingServiceUrl = `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?&f=json&token=${process.env.NEXT_PUBLIC_ARCGIS_APIKEY}`;
    const params: __esri.locatorAddressToLocationsParams = {
      address: {
        address: data.address,
      },
      countryCode: "GBR",
      outSpatialReference: SpatialReference.WebMercator, //{ wkid: 3857 }
    };
    const addresses = await addressToLocations(geocodingServiceUrl, params);
    for (let a of addresses) {
      console.log(a.toJSON());
    }
    setAddressList(addresses);
    dispatch(setAddressModalState(true));
  };
  // useEffect(() => {
  // }, [dispatch]);
  // console.log(addressList);
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
      {userCoordinates && <button onClick={saveUserLocation}>Continue</button>}
      {addressList && isModalOpen && (
        <AddressModal addressCandidate={addressList} />
      )}
    </section>
  );
}

export default Location;
