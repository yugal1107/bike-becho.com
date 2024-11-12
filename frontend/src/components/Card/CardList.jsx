import React from "react";
import { bikeData } from "../../Data/CardData"; // Adjust the import path as needed
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";

export default function Card() {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-5 bg-gray-100">
      {bikeData.map((bike) => (
        <Link
          to={`/item/${bike.id}`}
          key={bike.id}
          className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <ItemCard
            image={bike.image}
            id={bike.id}
            title={bike.title}
            description={bike.description}
            year={bike.year}
            price={bike.price}
          />
        </Link>
      ))}
    </div>
  );
}
