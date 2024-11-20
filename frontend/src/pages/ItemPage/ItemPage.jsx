import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Chip } from "@nextui-org/react"; // Add this import
import { app } from "../../firebase";
import BuyButton from "./BuyButton";

const ItemPage = () => {
  const { itemid } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchItemData = async () => {
      const db = getFirestore(app);
      const itemDoc = doc(db, "listings", itemid);
      const itemSnapshot = await getDoc(itemDoc);

      if (itemSnapshot.exists()) {
        setItem(itemSnapshot.data());
      } else {
        console.error("No such document!");
      }
    };

    fetchItemData();
  }, [itemid]);

  const calculateAge = (year) => {
    const currentYear = new Date().getFullYear();
    return currentYear - Number(year);
  };

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm mb-6">
          <Link to="/" className="text-red-500 hover:text-red-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">
            {item.brand} {item.model}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={item.images?.[selectedImage]}
                  alt={item.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {item.images?.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 
                        ${
                          selectedImage === idx
                            ? "border-red-500"
                            : "border-gray-200"
                        }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h1>
                <p className="text-2xl font-bold text-red-500">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>
                {item.year && (
                  <p className="text-sm text-gray-600 mt-1">
                    {calculateAge(item.year)} years old ({item.year})
                  </p>
                )}
              </div>

              {/* Enhanced Specifications */}
              <div className="flex flex-wrap gap-3 mb-4">
                {item.condition && (
                  <Chip
                    color={item.condition === "New" ? "success" : "default"}
                  >
                    {item.condition}
                  </Chip>
                )}
                {item.mileage && (
                  <Chip variant="flat" className="bg-green-100">
                    {item.mileage} km
                  </Chip>
                )}
                {item.fuelType && (
                  <Chip variant="flat" className="bg-purple-100">
                    {item.fuelType}
                  </Chip>
                )}
                {item.transmission && (
                  <Chip variant="flat" className="bg-blue-100">
                    {item.transmission}
                  </Chip>
                )}
                {item.ownership && (
                  <Chip variant="flat" className="bg-yellow-100">
                    {item.ownership} Owner
                  </Chip>
                )}
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-y-4">
                {[
                  ["Brand", item.brand],
                  ["Model", item.model],
                  ["Year", item.year],
                  ["Mileage", `${item.mileage} km`],
                  ["Fuel Type", item.fuelType],
                  ["Location", item.location || "Not specified"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-gray-500 text-sm">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Seller Information
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {item.sellerName || "Anonymous Seller"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Member since {item.sellerJoinDate || "recently"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <BuyButton itemId={itemid} sellerId={item.userId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
