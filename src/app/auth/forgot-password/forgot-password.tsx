"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
  email: string;
};

export default function AuthForm() {
  const [emailSent, setEmailSent] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const dispatch = useAppDispatch();
  const signError = useAppSelector(selectError);
  const status = useAppSelector(selectStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();

  const onSubmit = async (formData: UserDetails) => {
    try {
      dispatch(setStatus("loading"));

      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/update-password`,
        }
      );

      if (data && !error) {
        dispatch(setStatus("success"));
        setEmailSent(true);
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

  return (
    <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Email address</label>
          <input
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", { required: true })}
            id="email"
            placeholder="example@email.com"
            className="w-full px-3 py-2 border rounded-md border-mainColor bg-white text-mainColor"
          />
          {errors.email && errors.email.type === "required" && (
            <span role="alert" className="text-red-500 text-sm">
              Email is required
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {status === "loading" && <Loader text="Please wait..." />}
        {emailSent && (
          <p className="text-center text-green-500 text-sm">
            Success. Check Your email for the reset link
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
