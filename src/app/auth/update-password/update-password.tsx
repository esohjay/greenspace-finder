"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Loader from "@/components/loader";
import {
  selectError,
  setError,
  setStatus,
  selectStatus,
} from "@/redux/features/authSlice";

type UserDetails = {
  password: string;
  confirm_password: string;
};

export default function AuthForm() {
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const signError = useAppSelector(selectError);
  const status = useAppSelector(selectStatus);

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<UserDetails>();

  const onSubmit = async (formData: UserDetails) => {
    if (formData.confirm_password !== formData.confirm_password) {
      setFormError("confirm_password", { type: "required" });
      return;
    }
    try {
      dispatch(setStatus("loading"));
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (data && !error) {
        dispatch(setStatus("success"));
        setPasswordUpdated(true);
        // dispatch(setUser(data.user));
      }
      if (error) {
        dispatch(setStatus("error"));
        dispatch(setError(error.message));
      }
    } catch (err) {
      dispatch(setStatus("error"));
    } finally {
      dispatch(setStatus("idle"));
    }
  };
  useEffect(() => {
    if (passwordUpdated) {
      router.push("/");
    }
  }, [passwordUpdated, router]);
  return (
    <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password", { required: true })}
            id="password"
            placeholder="*********"
            className="w-full px-3 py-2 border rounded-md border-mainColor bg-white text-mainColor"
          />
          {errors.password && errors.password.type === "required" && (
            <span role="alert" className="text-red-500 text-sm">
              Password is required
            </span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm">Confirm password</label>
          <input
            type="password"
            aria-invalid={errors.confirm_password ? "true" : "false"}
            {...register("confirm_password", { required: true })}
            id="confirm_password"
            placeholder="*********"
            className="w-full px-3 py-2 border rounded-md border-mainColor bg-white text-mainColor"
          />
          {errors.confirm_password &&
            errors.confirm_password.type === "required" && (
              <span role="alert" className="text-red-500 text-sm">
                Password do not match
              </span>
            )}
        </div>
      </div>
      <div className="space-y-2">
        {status === "loading" && <Loader text="Please wait..." />}
        {passwordUpdated && (
          <p className="text-center text-green-500 text-sm">
            Success. Redirecting
          </p>
        )}
        <div>
          <button
            type="submit"
            className="w-full mb-3 px-8 py-3 font-semibold rounded-md bg-altColor text-white"
          >
            Send
          </button>
          <p className="text-center text-sm text-red-500">{signError}</p>
        </div>
        <p className="px-6 text-sm text-center text-mainColor">
          Don&#39;t have an account yet?{" "}
          <Link
            rel="noopener noreferrer"
            href="/auth/register"
            className="hover:underline text-altColor"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
