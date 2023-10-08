import React from "react";
import RegisterForm from "./auth-form";

function Register() {
  return (
    <section className="grid min-h-screen bg-authBg ">
      <section className="bg-black py-12 place-items-center grid bg-opacity-25 backdrop-blur-sm h-full w-full">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-mainColor">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign up</h1>
            <p className="text-sm text-gray-400">Register to get started</p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </section>
  );
}

export default Register;
