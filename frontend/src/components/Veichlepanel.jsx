import React from "react";
import ubercarLogo from "/images/uber-car-logo.png";
import ubermotoLogo from "/images/uber-moto.webp";
import uberautoLogo from "/images/uber-auto.png";
const Veichlepanel = (props) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Choose a veichle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex items-center justify-between p-3 border-2 active:border-black rounded-xl  w-full mb-3"
      >
        <img className="h-14" src={ubercarLogo} alt="" />
        <div className=" w-1/2">
          <h4 className="font-medium text-xl">
            UberGo{" "}
            <span className="text-base text-gray-800 font-normal">
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs text-gray-500">
            Affordable,compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold ">
          <i className="ri-money-rupee-circle-line"></i>
          193.20
        </h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex items-center justify-between p-3 border-2 active:border-black rounded-xl  w-full mb-3"
      >
        <img className="h-14" src={ubermotoLogo} alt="" />
        <div className=" w-1/2">
          <h4 className="font-medium text-xl">
            Moto{" "}
            <span className="text-base text-gray-800 font-normal">
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-medium text-xs text-gray-500">
            Affordable,compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold ">
          <i className="ri-money-rupee-circle-line"></i>
          65
        </h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex items-center justify-between p-3 border-2 active:border-black rounded-xl  w-full"
      >
        <img className="h-14" src={uberautoLogo} alt="" />
        <div className=" w-1/2">
          <h4 className="font-medium text-xl">
            UberAuto{" "}
            <span className="text-base text-gray-800 font-normal">
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">4 mins away</h5>
        </div>
        <h2 className="text-xl font-semibold ">
          <i className="ri-money-rupee-circle-line"></i>
          120
        </h2>
      </div>
    </div>
  );
};

export default Veichlepanel;
