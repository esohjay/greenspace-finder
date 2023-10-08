"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import useFetch from "@/hooks/useFetch";
import { User, AuthError } from "@supabase/supabase-js";
import Loader from "@/components/loader";
import {
  selectError,
  setError,
  setUser,
  selectUser,
  setStatus,
  selectStatus,
} from "@/redux/features/authSlice";

type UserDetails = {
  email: string;
  password: string;
};

export default function AuthForm() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const supabase = createClientComponentClient<Database>();
  const dispatch = useAppDispatch();
  const signError = useAppSelector(selectError);
  const signUser = useAppSelector(selectUser);
  const { getProfile } = useFetch();
  const status = useAppSelector(selectStatus);
  const router = useRouter();
  // const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();

  const onSubmit = async (formData: UserDetails) => {
    try {
      dispatch(setStatus("loading"));
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (data && !error) {
        dispatch(setStatus("success"));
        setAuthUser(data.user);
        // dispatch(setUser(data.user));
      }
      if (error) {
        dispatch(setStatus("error"));
        dispatch(setError(error.message));
      }
    } catch (err) {
      dispatch(setStatus("error"));
    } finally {
      if (authUser) {
        dispatch(setStatus("idle"));
        router.push("/");
      }
    }
  };
  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);
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
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm">Password</label>
            <Link
              rel="noopener noreferrer"
              href="#"
              className="text-xs hover:underline text-mainColor"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password", { required: true })}
            placeholder="*****"
            className="w-full px-3 py-2 border rounded-md  border-mainColor bg-white text-mainColor"
          />
          {errors.password && errors.password.type === "required" && (
            <span role="alert" className="text-red-500 text-sm">
              Password is required
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {status === "loading" && <Loader text="Please wait..." />}
        {status === "success" && (
          <p className="text-center text-green-500 text-sm">
            Success. Redirecting...
          </p>
        )}
        <div>
          <button
            type="submit"
            className="w-full mb-3 px-8 py-3 font-semibold rounded-md bg-altColor text-white"
          >
            Sign in
          </button>
          <p className="text-center text-sm text-red-500">{signError}</p>
        </div>
        <p className="px-6 text-sm text-center text-mainColor">
          Don&#39;t have an account yet?{" "}
          <Link
            rel="noopener noreferrer"
            href="register"
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
