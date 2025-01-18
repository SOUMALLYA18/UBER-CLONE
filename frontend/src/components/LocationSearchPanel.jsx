import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "Kyoto, Japan",
    "Cape Town, South Africa",
    "Reykjavik, Iceland",
    "Machu Picchu, Peru",
    "Santorini, Greece",
  ];

  return (
    <div>
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            props.setVeichlePanel(true);
            props.setPanelOpen(false);
          }}
          key={index}
          className="flex items-center justify-center gap-4 p-4 my-4 border-2 border-white active:border-black rounded-xl"
        >
          <h2 className="h-8 w-12 flex items-center justify-center font-semibold bg-[#eee] rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
