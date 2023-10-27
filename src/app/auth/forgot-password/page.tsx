import React from "react";
import AuthForm from "./forgot-password";

async function ForgotPassword() {
  return (
    <section className="grid min-h-screen bg-authBg ">
      <section className="bg-black place-items-center grid bg-opacity-25 backdrop-blur-sm h-full w-full">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-mainColor">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Reset Password</h1>
            <p className="text-sm text-mainColor">
              A password reset link will be sent to your email address
            </p>
          </div>
          <AuthForm />
        </div>
      </section>
    </section>
  );
}

export default ForgotPassword;
