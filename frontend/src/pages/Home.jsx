import React, { useState, useRef, useEffect } from "react";
import uberLogo from "/images/Uber_logo.png";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Veichlepanel from "../components/Veichlepanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const veichleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const veichlePanelRef = useRef(null);

  const [veichlePanel, setVeichlePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [veichleFound, setveichleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const submithandler = (e) => {
    e.preventDefault();
  };
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (!value.trim()) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {}
  };

  const findTrip = async () => {
    if (pickup.trim() && destination.trim()) {
      try {
        const token = localStorage.getItem("token");

        const requestUrl = `${
          import.meta.env.VITE_BASE_URL
        }/rides/get-fare?origin=${encodeURIComponent(
          pickup
        )}&destination=${encodeURIComponent(destination)}`;

        const response = await axios.get(requestUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFare(response.data);
        setVeichlePanel(true);
        setPanelOpen(false);
      } catch (error) {
        console.error(
          "Error fetching fare:",
          error.response ? error.response.data : error.message
        );
        alert("Failed to fetch fare. Please try again.");
      }
    } else {
      alert("Please select both a pickup location and a destination.");
    }
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        duration: 0.5,
        overflowY: "auto",
      });
      gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
        duration: 0.5,
        overflowY: "hidden",
      });
      gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (veichlePanel) {
      gsap.to(veichlePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(veichlePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [veichlePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (veichleFound) {
      gsap.to(veichleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(veichleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [veichleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [veichleFound]);
  return (
    <div className="relative h-screen w-screen overflow-hidden ">
      <img
        className="w-16 absolute left-5 top-5 "
        src={uberLogo}
        alt="uber-logo"
      />
      <div className="h-screen w-screen ">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background Animation"
        />
      </div>
      <div className=" h-screen absolute top-0 w-full flex flex-col justify-end  ">
        <div className="h-[30%] bg-white p-5  relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="text-2xl absolute right-2 top-3 opacity-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>{" "}
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-700 rounded-full left-10"></div>
            <input
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                handlePickupChange(e);
              }}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 border-none outline-none"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                handleDestinationChange(e);
              }}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              className="bg-[#eee] px-12 py-2 text-base  rounded-lg w-full mt-3 border-none outline-none"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <div className=" w-full mt-5">
            <button
              onClick={findTrip}
              className="  bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg "
            >
              <h3>Find A Trip</h3>
            </button>
          </div>
        </div>
        <div ref={panelRef} className="h-0 bg-white ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVeichlePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={veichlePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-8 pt-12 "
      >
        <Veichlepanel
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVeichlePanel={setVeichlePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-8 pt-12"
      >
        <ConfirmRidePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setveichleFound={setveichleFound}
        />
      </div>
      <div
        ref={veichleFoundRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-8 pt-12"
      >
        <LookingForDriver />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bottom-0 translate-y-full  bg-white w-full px-3 py-8 pt-12"
      >
        <WaitingForDriver />
      </div>
    </div>
  );
};

export default Home;
