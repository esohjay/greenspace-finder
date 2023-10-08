import React from "react";
import AuthForm from "./auth-form";

async function Login() {
  return (
    <section className="grid min-h-screen bg-authBg ">
      <section className="bg-black place-items-center grid bg-opacity-25 backdrop-blur-sm h-full w-full">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-mainColor">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm text-mainColor">
              Sign in to access your account
            </p>
          </div>
          <AuthForm />
        </div>
      </section>
    </section>
  );
}

export default Login;
