import React from "react";
import ubercarLogo from "/images/uber-car-logo.png";
const LookingForDriver = (props) => {
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
              <h3 className="text-lg  font-semibold -mt-1 text-gray-600">
                {props.pickup}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-semibold -mt-1 text-gray-600">
                {props.destination}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props.fare[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
