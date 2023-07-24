"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

type UserDetails = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

function Register() {
  const supabase = createClientComponentClient<Database>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();
  const onSubmit = async (formData: UserDetails) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    console.log(data);
  };
  return (
    <section className="grid min-h-screen place-items-center">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-400">Register to get started</p>
        </div>
        <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">First name</label>
              <input
                type="text"
                aria-invalid={errors.first_name ? "true" : "false"}
                {...register("first_name", { required: true, maxLength: 30 })}
                id="first_name"
                placeholder="John"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
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
                {...register("last_name", { required: true, maxLength: 30 })}
                id="last_name"
                placeholder="Doe"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
              />
              {errors.last_name && errors.last_name.type === "required" && (
                <span role="alert" className="text-red-500 text-sm">
                  Last name is required
                </span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", { required: true, maxLength: 30 })}
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
              <label className="text-sm">Password</label>

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
                Register
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-400">
              Already have an account?
              <Link
                rel="noopener noreferrer"
                href="login"
                className="hover:underline text-violet-400"
              >
                Sign in
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
