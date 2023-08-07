import React from "react";
import AuthForm from "./auth-form";

async function Login() {
  return (
    <section className="grid min-h-screen place-items-center">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <AuthForm />
      </div>
    </section>
  );
}

export default Login;
