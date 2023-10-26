"use client";
import React, { useEffect, useState } from "react";
import LocationMap from "@/components/locationMap";
import { FaSearchLocation } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { selectMapCenterCoordinates } from "@/redux/features/mapSlice";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "@/components/loader";
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
import useFetch from "@/hooks/useFetch";

type Inputs = {
  address: string;
};

function Location({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("prev");
  const router = useRouter();
  const { updateLocation } = useFetch();
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
      if (userCoordinates) {
        const { error, data } = await updateLocation({
          location: `POINT(${userCoordinates?.long} ${userCoordinates?.lat})`,
          lat: userCoordinates?.lat,
          long: userCoordinates?.long,
        });

        if (error) {
          throw error;
        } else {
          if (search) {
            router.push(`/${search}`);
          } else if (!search) {
            router.push(`/`);
          }
          dispatch(setStatus("success"));
        }
      }
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
  //   console.log("click21");
  //   if (status === "success" && search) {
  //     console.log("click2");
  //     router.push(`/${search}`);
  //   } else if (status === "success" && !search) {
  //     router.push(`/`);
  //   }
  // }, [search, router, status]);
  return (
    <main className="grid place-items-center">
      <section className="w-full min-h-screen max-w-lg bg-white">
        <article className="p-5 bg-mainColor text-white">
          <h3 className="text-center mb-3 text-lg font-bold">
            Select location
          </h3>
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
        <div className="h-[55vh] md:h-[300px] w-full p-2">
          <LocationMap
            mapOptions={{
              basemap: "streets-vector",
            }}
          />
        </div>
        {status === "loading" && <Loader text="Please wait..." />}
        {/* {status === "success" && (
          <p className="text-center py-4 text-green-500">Redirecting...</p>
        )} */}
        {userCoordinates && (
          <div className="text-center py-5">
            <button
              className="inline-block px-6 py-3 rounded-full bg-mainColor text-white"
              onClick={saveUserLocation}
            >
              Continue
            </button>
          </div>
        )}
        {addressList && isModalOpen && (
          <AddressModal addressCandidate={addressList} />
        )}
      </section>
    </main>
  );
}

export default Location;
