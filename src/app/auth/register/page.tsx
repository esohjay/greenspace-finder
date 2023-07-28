import React from "react";
import RegisterForm from "./auth-form";

function Register() {
  return (
    <section className="grid min-h-screen place-items-center py-10 px-5">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign up</h1>
          <p className="text-sm text-gray-400">Register to get started</p>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}

export default Register;
