import React from "react";
import ubercarLogo from "/images/uber-car-logo.png";
const LookingForDriver = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5 text-center">
        Looking for Driver
      </h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-24" src={ubercarLogo} alt="" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-t-2">
            <i className="text-lg ri-user-location-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya talab Ahemdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya talab Ahemdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
