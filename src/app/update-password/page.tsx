import React from "react";
import AuthForm from "./update-password";

async function ResetPassword() {
  return (
    <main className="grid place-items-center">
      <section className="w-full min-h-screen  max-w-lg bg-white">
        <div className="flex flex-col max-w-lg p-6 rounded-md sm:p-10 bg-white text-mainColor">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">New Password</h1>
            <p className="text-sm text-mainColor">Update your password</p>
          </div>
          <AuthForm />
        </div>
      </section>
    </main>
  );
}

export default ResetPassword;
