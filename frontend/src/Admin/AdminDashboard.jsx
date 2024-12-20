import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [buyRequests, setBuyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyRequests = async () => {
      try {
        const db = getFirestore(app);
        const buyRequestsCollection = collection(db, "buyRequests");
        const buyRequestsSnapshot = await getDocs(buyRequestsCollection);
        const buyRequestsList = buyRequestsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBuyRequests(buyRequestsList);
      } catch (err) {
        setError("Failed to fetch buy requests. Please try again.");
        console.error("Error fetching buy requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Buy Requests</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Buyer Name</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Note</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyRequests.map((request) => (
            <tr key={request.id}>
              <td className="py-2 px-4 border-b">{request.buyerName}</td>
              <td className="py-2 px-4 border-b">{request.mobile}</td>
              <td className="py-2 px-4 border-b">{request.note}</td>
              <td className="py-2 px-4 border-b">
                {new Date(request.timestamp.seconds * 1000).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                <Link
                  to={`/item/${request.itemId}`}
                  className="text-blue-500 hover:underline"
                >
                  See Listing
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;