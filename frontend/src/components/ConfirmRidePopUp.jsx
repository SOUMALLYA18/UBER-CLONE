import React, { useEffect, useState } from "react";
import uberUserLogo from "/images/userlogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ConfirmRidePopUp = (props) => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Props.ride in ConfirmRidePopUp:", props.ride);
  }, [props.ride]);

  const submithandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    const rideId = props.ride?._id;
    console.log("rideId:", rideId, "otp:", otp);

    const url = `${import.meta.env.VITE_BASE_URL}/rides/start-ride`;
    console.log("Request URL:", url);

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await axios.get(url, {
        params: {
          rideId,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-riding");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("An error occurred while starting the ride.");
    }
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5"> Confirm To Start Ride</h3>
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
              <p className="text-sm -mt-1 text-gray-600">Cash </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-6">
          <form onSubmit={submithandler}>
            <input
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              className=" text-center text-black bg-[#e3f2fd] font-semibold px-12 py-2 text-base rounded-lg w-full mt-5 border-none outline-none"
              type="text"
              placeholder="Enter OTP"
            />
            <button className=" flex justify-center w-full mt-2 bg-[#28A745] text-white font-semibold p-2 rounded-lg">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setRidePopupPanel(false);
                props.setConfirmRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-[#dc3545] text-white font-semibold p-2 rounded-lg"
            >
              Cancle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
