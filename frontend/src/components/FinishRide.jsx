import React from "react";

import uberUserLogo from "/images/userlogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Finishride = (props) => {
  const navigate = useNavigate();
  const endRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5"> Ride Completed</h3>
      <div className="flex items-center justify-between w-full p-3 rounded-lg bg-[#ffeb3b] text-gray-800">
        <div className="flex items-center gap-2  ">
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={uberUserLogo}
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-t-2">
            <i className="text-lg ri-user-location-fill"></i>

            <div>
              <h3 className="text-lg font-medium -mt-1 text-gray-600">
                {props.ride?.pickup}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium -mt-1 text-gray-600">
                {props.ride?.destination}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={endRide}
        className=" flex justify-center w-full mt-2 bg-[#28A745] text-white font-semibold p-2 rounded-lg"
      >
        Finish Ride
      </button>
    </div>
  );
};

export default Finishride;
