import React from "react";

function ConfirmationPage() {
  return (
    <section className="grid min-h-screen bg-authBg ">
      <section className="bg-black px-5 py-12 place-items-center grid bg-opacity-25 backdrop-blur-sm h-full w-full">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-mainColor">
          <h3 className="text-green-500 text-2xl text-center mb-3">
            Registration successfull
          </h3>
          <p className="text-center text-mainColor mb-2">
            A account activation link has been sent to your email address.
          </p>
          <p className="text-center text-secondaryColor mb-2">
            Kindly go to your email and click the link to activate your account.
          </p>
          <p className="text-center text-altColor mb-2">
            If you cannot find the email, please check your spam/junk folder.
          </p>
        </div>
      </section>
    </section>
  );
}

export default ConfirmationPage;
