import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

const BuyButton = ({ itemId, sellerId }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
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
      const buyerDoc = await getDoc(doc(db, "users", user.uid));
      const buyerName = buyerDoc.exists()
        ? buyerDoc.data().name
        : "Unknown Buyer";

      const buyRequest = {
        itemId,
        buyerId: user.uid,
        note,
        timestamp: new Date(),
      };

      const notification = {
        userId: sellerId,
        message: `${buyerName} has requested to buy item ${itemId}`,
        read: false,
        timestamp: new Date(),
      };

      const batch = writeBatch(db);
      const buyRequestRef = doc(collection(db, "buyRequests"));
      const notificationRef = doc(collection(db, "notifications"));

      batch.set(buyRequestRef, buyRequest);
      batch.set(notificationRef, notification);

      await batch.commit();

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
