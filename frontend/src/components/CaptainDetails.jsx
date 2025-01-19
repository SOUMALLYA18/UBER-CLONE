import React from "react";
import userLogo from "/images/useravatar.jpg";
const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-14 w-14 rounded-full object-cover"
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
  );
};

export default CaptainDetails;
