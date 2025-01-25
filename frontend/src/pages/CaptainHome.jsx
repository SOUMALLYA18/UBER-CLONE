import React, { useContext, useEffect, useRef, useState } from "react";

import uberLogo from "../../public/images/uber-driver.svg";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const confirmRidePopupPanelRef = useRef(null);
  const ridePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    // Emit the join event when the component mounts
    socket.emit("join", { userType: "captain", userId: captain._id });

    // Track the last location to avoid emitting unnecessary updates
    let lastLocation = { ltd: 0, lng: 0 };

    // Function to update the captain's location
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            };

            // Check if the location has changed significantly
            if (
              Math.abs(lastLocation.ltd - locationData.location.ltd) > 0.0001 ||
              Math.abs(lastLocation.lng - locationData.location.lng) > 0.0001
            ) {
              // Emit location update to the server
              socket.emit("update-location-captain", locationData);
              lastLocation = locationData.location; // Update the last location
            }
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
      }
    };

    // Call updateLocation initially and set up an interval for periodic updates
    updateLocation(); // Initial location update
    const locationInterval = setInterval(updateLocation, 10000); // Updates every 10 seconds

    // Cleanup function to clear the interval and leave the socket
    return () => {
      clearInterval(locationInterval); // Clear the interval
      socket.emit("leave", { userType: "captain", userId: captain._id }); // Notify the server of disconnection
    };
  }, [socket, captain._id]);

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });
  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  };

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );
  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
