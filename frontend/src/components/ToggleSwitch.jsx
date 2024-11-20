// src/components/ToggleSwitch.jsx
import React from "react";

const ToggleSwitch = ({ view, setView }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="flex items-center space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            view === "buy" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("buy")}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            view === "rent" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("rent")}
        >
          Rent
        </button>
      </div>
    </div>
  );
};

export default ToggleSwitch;