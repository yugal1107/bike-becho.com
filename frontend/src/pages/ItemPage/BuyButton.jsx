import React, { useState } from "react";

const BuyButton = ({ onBuy }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");

  const handleBuy = () => {
    onBuy(note);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        onClick={() => setShowModal(true)}
      >
        Buy
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-2xl font-bold mb-4">Buy Request</h2>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                rows={3}
                placeholder="Add a note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                  onClick={handleBuy}
                >
                  Send Buy Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyButton;
