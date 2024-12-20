import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

const BuyButton = ({ itemId }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = async () => {
    setLoading(true);
    setError("");
    const db = getFirestore(app);
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to buy an item.");
      setLoading(false);
      return;
    }

    try {
      const buyerName = user.displayName || "Unknown Buyer";

      const buyRequest = {
        itemId,
        buyerId: user.uid,
        buyerName,
        mobile,
        note,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "buyRequests"), buyRequest);

      alert("Buy request sent!");
      setShowModal(false);
    } catch (error) {
      console.error("Error sending buy request:", error);
      setError("Failed to send buy request. Please try again.");
    } finally {
      setLoading(false);
    }
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
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                rows={3}
                placeholder="Add a note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              {error && <p className="text-red-500">{error}</p>}
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
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Buy Request"}
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
