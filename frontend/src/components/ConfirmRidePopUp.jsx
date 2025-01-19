import React, { useState } from "react";
import uberUserLogo from "/images/userlogo.jpg";
import { Link } from "react-router-dom";
const ConfirmRidePopUp = (props) => {
  const [otp, setOTP] = useState("");
  const submithandler = (e) => {
    e.preventDefault();
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
          <h2 className="text-lg font-medium">Soumallya Mukherjee</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
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

        <div className="w-full mt-6">
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
          >
            <input
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              className=" text-center text-black bg-[#e3f2fd] font-semibold px-12 py-2 text-base rounded-lg w-full mt-5 border-none outline-none"
              type="text"
              placeholder="Enter OTP"
            />
            <Link
              to="/captain-riding"
              className=" flex justify-center w-full mt-2 bg-[#28A745] text-white font-semibold p-2 rounded-lg"
            >
              Confirm
            </Link>
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
