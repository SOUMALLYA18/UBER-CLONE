import React, { useState } from "react";
import uberLogo from "/images/Uber_logo.png";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const submithandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="relative h-screen w-screen overflow-x-hidden ">
      <img
        className="w-16 absolute left-5 top-5 "
        src={uberLogo}
        alt="uber-logo"
      />
      <div className="h-screen w-screen ">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background Animation"
        />
      </div>
      <div className=" h-screen absolute top-0 w-full flex flex-col justify-end ">
        <div className="h-[30%] bg-white p-5  relative">
          {" "}
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-700 rounded-full left-10"></div>
            <input
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 border-none outline-none"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base  rounded-lg w-full mt-3 border-none outline-none"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div className="h-0 bg-red-500 "></div>
      </div>
    </div>
  );
};

export default Home;
