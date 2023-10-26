"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Profile } from "@/types/user";
import useFetch from "@/hooks/useFetch";
import { setStatus, selectStatus } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loader from "@/components/loader";

type FormField = {
  phone: string;
  search_radius: string;
  first_name: string;
  last_name: string;
  unit: string;
};

function Account({ user }: { user: Profile }) {
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const { updateProfile } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>();
  const onSubmit = async (formData: FormField) => {
    const search_radius = Number(formData.search_radius);
    try {
      dispatch(setStatus("loading"));

      const { error, data } = await updateProfile({
        ...formData,
        search_radius,
      });

      if (error) {
        throw error;
      }
      dispatch(setStatus("success"));
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    } finally {
      dispatch(setStatus("idle"));
    }
  };
  return (
    <form className="space-y-12 p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">First name</label>
          <input
            type="text"
            aria-invalid={errors.first_name ? "true" : "false"}
            {...register("first_name", {
              required: true,
              maxLength: 30,
              value: `${user.first_name}`,
            })}
            id="first_name"
            placeholder="John"
            className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
          />
          {errors.first_name && errors.first_name.type === "required" && (
            <span role="alert" className="text-red-500 text-sm">
              First name is required
            </span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm">Last name</label>
          <input
            type="text"
            aria-invalid={errors.last_name ? "true" : "false"}
            {...register("last_name", {
              required: true,
              maxLength: 30,
              value: `${user.last_name}`,
            })}
            id="last_name"
            placeholder="Doe"
            className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
          />
          {errors.last_name && errors.last_name.type === "required" && (
            <span role="alert" className="text-red-500 text-sm">
              Last name is required
            </span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm">Phone</label>
          <input
            type="text"
            aria-invalid={errors.phone ? "true" : "false"}
            {...register("phone", {
              required: false,
              maxLength: 14,
              value: `${user.phone ? user.phone : ""}`,
            })}
            id="phone"
            placeholder="071233567888"
            className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
          />
          {errors.phone && errors.phone.type === "required" && (
            <span role="alert" className="text-red-500 text-sm">
              Phone is required
            </span>
          )}
        </div>
        <article className="grid grid-cols-2 gap-x-5">
          <div>
            <label className="block mb-2 text-sm">Search radius</label>
            <select
              aria-invalid={errors.search_radius ? "true" : "false"}
              {...register("search_radius", {
                required: true,
                value: `${user.search_radius}`,
              })}
              id="search_radius"
              placeholder="5"
              className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
            {errors.search_radius &&
              errors.search_radius.type === "required" && (
                <span role="alert" className="text-red-500 text-sm">
                  Search radius is required
                </span>
              )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Unit</label>
            <select
              aria-invalid={errors.phone ? "true" : "false"}
              {...register("unit", {
                required: true,
                value: `${user.unit}`,
              })}
              id="unit"
              placeholder="miles"
              className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
            >
              <option value="miles">Miles</option>
              <option value="meters">Meters</option>
              <option value="kilometers">Kilometers</option>
              <option value="feet">Feet</option>
            </select>
            {errors.unit && errors.unit.type === "required" && (
              <span role="alert" className="text-red-500 text-sm">
                Unit is required
              </span>
            )}
          </div>
        </article>
      </div>
      <div className="space-y-2">
        <div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-altColor text-white"
          >
            Save
          </button>
        </div>
        {status === "loading" && <Loader text="Please wait..." />}
        {status === "success" && (
          <p className="text-center text-green-500 text-sm"> updated.</p>
        )}
      </div>
    </form>
  );
}

export default Account;
