"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

type UserDetails = {
  email: string;
  password: string;
};

function Login() {
  const supabase = createClientComponentClient<Database>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();
  const onSubmit = async (formData: UserDetails) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    console.log(data, error);
  };
  return (
    <section className="grid min-h-screen place-items-center">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
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
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
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
                  className="text-xs hover:underline text-gray-400"
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
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
              />
              {errors.password && errors.password.type === "required" && (
                <span role="alert" className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-400">
              Don&#39;t have an account yet?
              <Link
                rel="noopener noreferrer"
                href="register"
                className="hover:underline text-violet-400"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
