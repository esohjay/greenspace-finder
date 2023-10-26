"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Profile } from "@/types/user";
import useFetch from "@/hooks/useFetch";
import { setStatus, selectStatus } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loader from "@/components/loader";

type FormField = {
  password: string;
  email: string;
};

function EditAuthDetails({ email }: { email: string | undefined }) {
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const { emailUpdate, passwordUpdate } = useFetch();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    resetField,
    formState: { errors },
  } = useForm<FormField>();
  const handleEmailUpdate = async () => {
    try {
      dispatch(setStatus("loading"));
      if (!getValues("email")) {
        setError("email", { type: "required" });
        return;
      }
      const { data, error } = await emailUpdate(getValues("email"));
      console.log(data, error);
      dispatch(setStatus("success"));
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    } finally {
      dispatch(setStatus("idle"));
    }
  };
  const handlePasswordUpdate = async () => {
    try {
      dispatch(setStatus("loading"));
      if (!getValues("password")) {
        setError("password", { type: "required" });
        return;
      }
      await passwordUpdate(getValues("password"));
      dispatch(setStatus("success"));
      resetField("password");
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    } finally {
      dispatch(setStatus("idle"));
    }
  };

  return (
    <form className="space-y-12 p-5">
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">
            Update email address
          </label>
          <div className="flex w-full items-center gap-x-5">
            <div className=" w-9/12">
              <input
                type="text"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: true,
                  maxLength: 30,
                  value: `${email}`,
                })}
                id="email"
                placeholder="John"
                className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
              />
              {errors.email && errors.email.type === "required" && (
                <span role="alert" className="text-red-500 text-sm">
                  email is required
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleEmailUpdate}
              className="w-3/12 px-8 py-3 font-semibold rounded-md bg-altColor text-white"
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Update password</label>
          <div className="flex w-full items-center gap-x-5">
            <div className=" w-9/12">
              <input
                type="password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  maxLength: 30,
                })}
                id="password"
                placeholder="*********"
                className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
              />
            </div>
            <button
              type="button"
              onClick={handlePasswordUpdate}
              className="w-3/12 px-8 py-3 font-semibold rounded-md bg-altColor text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditAuthDetails;
