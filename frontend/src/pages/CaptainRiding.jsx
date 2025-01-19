import React, { useRef, useState } from "react";
import uberLogo from "../../public/images/uber-driver.svg";
import { Link } from "react-router-dom";
import FinishRide from "../components/Finishride";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
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
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between bg-[#ffeb3b]">
        <h4 className="text-xl font-semibold w-full">4 Km Away</h4>
        <button
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className=" flex justify-center w-full mt-2 bg-[#28A745] text-white font-semibold p-2 rounded-lg"
        >
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 bottom-0  bg-white px-3 py-10 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
