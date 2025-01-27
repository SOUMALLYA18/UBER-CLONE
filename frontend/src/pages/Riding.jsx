import React, { useContext, useEffect } from "react";
import ubercarLogo from "/images/uber-car-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRideEnd = () => {
      navigate("/home");
    };

    socket.on("ride-ended", handleRideEnd);

    return () => {
      socket.off("ride-ended", handleRideEnd);
    };
  }, [socket, navigate]);

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className=" text-lg ri-home-5-fill"></i>
      </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img className="h-16" src={ubercarLogo} alt="" />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {ride?.captain.fullname.firstname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Mruti suzuki</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium -mt-1 text-gray-600">
                  {ride?.destination}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className=" text-lg ri-money-rupee-circle-line"></i>
              <div>
                <h3 className="text-lg font-medium">{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash </p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-[#28A745] text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
