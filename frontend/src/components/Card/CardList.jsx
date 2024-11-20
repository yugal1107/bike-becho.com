import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase";

const CardList = ({ view }) => {
  const [firestoreData, setFirestoreData] = useState([]);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      const db = getFirestore(app);
      const collectionName = view === "buy" ? "listings" : "rentals";
      const listingsCollection = collection(db, collectionName);
      const listingsSnapshot = await getDocs(listingsCollection);
      const listingsList = listingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirestoreData(listingsList);
    };

    fetchFirestoreData();
  }, [view]);

  return (
    <div className="flex flex-wrap justify-center gap-8 p-5 bg-gray-100">
      {firestoreData.map((listing) => (
        <div
          key={listing.id}
          className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <ItemCard
            id={listing.id}
            image={listing.images ? listing.images[0] : listing.image}
            title={listing.title}
            description={listing.description}
            year={listing.year}
            mileage={listing.mileage}
            price={listing.price}
            rentPrice={listing.rentPrice}
            className="bg-white rounded-lg shadow-lg p-6"
            type={view} // Pass the type prop
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;