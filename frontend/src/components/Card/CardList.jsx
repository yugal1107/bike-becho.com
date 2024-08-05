import React from "react";
import { bikeData } from "../../Data/CardData"; // Adjust the import path as needed
import ItemCard from "./ItemCard";

export default function Card() {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-5">
      {bikeData.map((bike) => (
        // <div
        //   key={bike.id}
        //   className="flex flex-col sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-2rem)] max-w-[262px] border border-gray-400 rounded-2xl h-[380px] p-2 hover:scale-110 transition duration-300 ease-in hover:shadow-[0_0_100px_-30px_black]"
        // >
        //   <h1 className="font-bold text-center m-2">{bike.title}</h1>
        //   <p className="text-sm text-gray-600 m-2 text-center">
        //     {bike.description}
        //   </p>
        //   <div className="m-3 flex justify-center">
        //     <img src={bike.image} className="h-[180px] object-cover" alt={bike.title} />
        //   </div>
        //   <div className="flex flex-col mt-2 mx-2">
        //     <p className="text-gray-800 font-semibold">Year: {bike.year}</p>
        //     <p className="text-gray-800 font-semibold">Mileage: {bike.mileage}</p>
        //     <p className="text-green-500 font-bold text-lg mt-2">{bike.price}</p>
        //   </div>
        // </div>
        <ItemCard
          key={bike.id}
          image={bike.image}
          id={bike.id}
          title={bike.title}
          description={bike.description}
          year={bike.year}
          price={bike.price}
        />
      ))}
    </div>
  );
}
