import React, { useState, useRef, useEffect } from "react";
import uberLogo from "/images/Uber_logo.png";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Veichlepanel from "../components/Veichlepanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriver from "../components/LookingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const veichleFoundRef = useRef(null);

  const veichlePanelRef = useRef(null);
  const [veichlePanel, setVeichlePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [veichleFound, setveichleFound] = useState(false);
  const submithandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", padding: 24, duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(panelRef.current, { height: "0%", padding: 0, duration: 0.5 });
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
      <div className=" h-screen absolute top-0 w-full flex flex-col justify-end ">
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
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 border-none outline-none"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-base  rounded-lg w-full mt-3 border-none outline-none"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white ">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVeichlePanel={setVeichlePanel}
          />
        </div>
      </div>
      <div
        ref={veichlePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-8 pt-12 "
      >
        <Veichlepanel
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
    </div>
  );
};

export default Home;
