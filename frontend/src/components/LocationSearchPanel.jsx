import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion); // Update pickup value
    } else if (activeField === "destination") {
      setDestination(suggestion); // Update destination value
    }
    // setPanelOpen(false);
  };

  return (
    <div className="p-4">
      {suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className="flex gap-4 border-2 p-3 border-gray-50 hover:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No suggestions found.</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
