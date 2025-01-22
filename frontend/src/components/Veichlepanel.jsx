import React from "react";
import ubercarLogo from "/images/uber-car-logo.png";
import ubermotoLogo from "/images/uber-moto.webp";
import uberautoLogo from "/images/uber-auto.png";

const VehiclePanel = (props) => {
  const handleVehicleSelect = (vehicleType) => {
    props.setVehicleType(vehicleType);
    props.setConfirmRidePanel(true); // Open the confirm ride panel
    props.createRide(vehicleType); // Pass the selected vehicle type to createRide function
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
      <div
        onClick={() => handleVehicleSelect("car")}
        className="flex items-center justify-between p-3 border-2 active:border-black rounded-xl w-full mb-3"
      >
        <img className="h-14" src={ubercarLogo} alt="Car" />
        <div className="w-1/2">
          <h4 className="font-medium text-xl">
            UberGo{" "}
            <span className="text-base text-gray-800 font-normal">
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs text-gray-500">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">
          <i className="ri-money-rupee-circle-line"></i>
          {props.fare.car}
        </h2>
      </div>
      <div
        onClick={() => handleVehicleSelect("moto")}
        className="flex items-center justify-between p-3 border-2 active:border-black rounded-xl w-full mb-3"
      >
        <img className="h-14" src={ubermotoLogo} alt="Moto" />
        <div className="w-1/2">
          <h4 className="font-medium text-xl">
            Moto{" "}
            <span className="text-base text-gray-800 font-normal">
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-medium text-xs text-gray-500">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">
          <i className="ri-money-rupee-circle-line"></i>
          {props.fare.moto}
        </h2>
      </div>
      <div
        onClick={() => handleVehicleSelect("auto")}
        className="flex items-center justify-between p-3 border-2 active:border-black rounded-xl w-full"
      >
        <img className="h-14" src={uberautoLogo} alt="Auto" />
        <div className="w-1/2">
          <h4 className="font-medium text-xl">
            UberAuto{" "}
            <span className="text-base text-gray-800 font-normal">
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">4 mins away</h5>
        </div>
        <h2 className="text-xl font-semibold">
          <i className="ri-money-rupee-circle-line"></i>
          {props.fare.auto}
        </h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
