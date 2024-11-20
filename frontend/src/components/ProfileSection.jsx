import React from "react";
import { useAuth } from "../context/authContext";

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <p className="text-center text-red-500">
        You need to log in to view your profile.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={currentUser.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {currentUser.displayName || "User"}
          </h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="text-gray-800">
              {currentUser.displayName || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-800">{currentUser.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">User ID:</span>
            <span className="text-gray-800">{currentUser.uid}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
