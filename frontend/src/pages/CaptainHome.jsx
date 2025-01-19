import React from "react";

import userLogo from "/images/useravatar.jpg";
import uberLogo from "../../public/images/uber-driver.svg";
import { Link } from "react-router-dom";
const CaptainHome = () => {
  return (
    <div className="h-screen">
      <div className="fixed top-0 p-3 flex items-center justify-between w-screen">
        <img className=" w-16" src={uberLogo} alt="uber-logo" />
        <Link
          to="/captain-login"
          className=" h-10 w-10 bg-white  flex items-center justify-center rounded-full"
        >
          <i className=" text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src={userLogo}
              alt=""
            />
            <h4 className="text-lg font-medium">test user</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">294.00</h4>
            <p className="text-lg  text-gray-600">Earned</p>
          </div>
        </div>
        <div className=" p-3 mt-6 bg-gray-100 rounded-2xl flex justify-center gap-5 items-start">
          <div className="text-center">
            <i className=" text-2xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-2xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-2xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
