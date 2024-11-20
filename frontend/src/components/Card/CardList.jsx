import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase";

const CardList = () => {
  const [firestoreData, setFirestoreData] = useState([]);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      const db = getFirestore(app);
      const listingsCollection = collection(db, "listings");
      const listingsSnapshot = await getDocs(listingsCollection);
      const listingsList = listingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirestoreData(listingsList);
    };

    fetchFirestoreData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 p-5 bg-gray-100">
      {firestoreData.map((listing) => (
        <div
          key={listing.id}
          className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Link to={`/item/${listing.id}`}>
            <ItemCard
              image={listing.images ? listing.images[0] : listing.image}
              id={listing.id}
              title={listing.title}
              description={listing.description}
              year={listing.year}
              mileage={listing.mileage}
              price={listing.price}
              className="bg-white rounded-lg shadow-lg p-6"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardList;
