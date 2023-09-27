"use client";
import { VscChromeClose } from "react-icons/vsc";

import {
  setMapCenterCoordinate,
  selectMapCenterCoordinates,
} from "@/redux/features/mapSlice";
import {
  setAddressModalState,
  selectAddressModalState,
} from "@/redux/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type propType = {
  addressCandidate: __esri.AddressCandidate[];
};
function AddressModal({ addressCandidate }: propType) {
  const coords = useAppSelector(selectMapCenterCoordinates);
  const modal = useAppSelector(selectAddressModalState);
  const dispatch = useAppDispatch();
  const handleLocationSelect = (lat: number, long: number) => {
    dispatch(setAddressModalState(false));
    dispatch(setMapCenterCoordinate({ lat, long }));
    console.log(long, lat);
  };

  return (
    <section
      className={` fixed top-0 w-full z-[53] h-screen  px-5 md:px-16 bg-black  bg-opacity-50 backdrop-blur-sm backdrop-filter
  ${modal ? "grid" : "hidden"} place-items-center`}
    >
      <article className="bg-white w-full scrollbar  max-w-2xl  mx-auto rounded-md relative  max-h-full h-4/6">
        <button
          onClick={() => dispatch(setAddressModalState(false))}
          className="block p-3 rounded-full text-lg text-red-500 md:text-2xl hover:bg-hoverColor"
        >
          <VscChromeClose />
        </button>
        {addressCandidate && addressCandidate.length > 0 ? (
          <ul className="w-full bg-white p-2 h-full scrollbar overflow-y-scroll">
            {addressCandidate?.map((addressProperties, i) => (
              <li
                key={i}
                className="p-2  border-b hover:bg-mainColor hover:text-white cursor-pointer mb-2"
                onClick={() =>
                  handleLocationSelect(
                    addressProperties.location.y,
                    addressProperties.location.x
                  )
                }
              >
                {addressProperties.address}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center font-semibold text-mainColor p-4">
            Address not found. Kindly insert your full address and try again.
          </p>
        )}
      </article>
    </section>
  );
}

export default AddressModal;
