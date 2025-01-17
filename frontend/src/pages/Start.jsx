import React from "react";
import uberLogo from "/images/Uber_logo.png";
import { Link } from "react-router-dom";
const Start = () => {
  return (
    <>
      <div className=" bg-cover bg-center bg-[url(/images/coverimage.jpg)] w-full pt-8 h-screen  flex justify-between flex-col">
        <img className="w-16 ml-8 " src={uberLogo} alt="uber-logo" />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
