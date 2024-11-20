// src/pages/RentPage/RentPage.jsx
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase";
import ItemCard from "../../components/Card/ItemCard";

const RentPage = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      const db = getFirestore(app);
      const rentalsCollection = collection(db, "rentals");
      const rentalsSnapshot = await getDocs(rentalsCollection);
      const rentalsList = rentalsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRentals(rentalsList);
    };

    fetchRentals();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 p-5 bg-gray-100">
      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <ItemCard
            id={rental.id}
            image={rental.images ? rental.images[0] : rental.image}
            title={rental.title}
            description={rental.description}
            year={rental.year}
            mileage={rental.mileage}
            price={rental.price}
            rentPrice={rental.rentPrice}
            className="bg-white rounded-lg shadow-lg p-6"
          />
        </div>
      ))}
    </div>
  );
};

export default RentPage;