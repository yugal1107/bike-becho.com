import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bikeData } from "../../Data/CardData";
import ItemCard from "../../components/Card/ItemCard";
import BuyButton from "./BuyButton";

const ItemPage = () => {
  const { itemid } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const bike = bikeData.find((bike) => bike.id === Number(itemid));
    setItem(bike);
  }, [itemid]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Main Bike Detail Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-red-500">
              {item.title || "Listing Title"}
            </h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500 font-medium">Brand</p>
                <p>{item.brand || "Brand Name"}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Model</p>
                <p>{item.model || "Model Name"}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Year</p>
                <p>{item.year || "Year of Manufacture"}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Price</p>
                <p>${item.price || "Price"}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Mileage</p>
                <p>{item.mileage || "Mileage in km"}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Fuel Type</p>
                <p>{item.fuelType || "Fuel Type"}</p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Description</h2>
              <p>
                {item.description ||
                  "Vehicle description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Seller Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 font-medium">Name</p>
                  <p>{item.sellerName || "Seller Name"}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Contact Number</p>
                  <p>{item.contactNumber || "Contact Number"}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Email</p>
                  <p>{item.email || "Seller Email"}</p>
                </div>
              </div>
            </div>
          </div>
          <BuyButton />
        </div>

        {/* More Items Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            More items from this region
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {bikeData.map((bike) => (
              <ItemCard
                key={bike.id}
                image={bike.image}
                id={bike.id}
                title={bike.title}
                year={bike.year}
                price={bike.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { bikeData } from "../../Data/CardData";
// import ItemCard from "../../components/Card/ItemCard";

// const ItemPage = () => {
//   const { itemid } = useParams();
//   const [item, setItem] = useState({});

//   useEffect(() => {
//     const item = bikeData.find((item) => item.id === Number(itemid));
//     // console.log(item);
//     setItem(item);
//   }, [itemid]);

//   // const [loading, setLoading] = useState(true);
//   return (
//     <div className="h-dvh">
//       <div className="flex gap-5 p-10 rounded-3xl">
//         <div className="image rounded-3xl basis-1/3 bg-cyan-50 flex items-center justify-center">
//           <img src={item.image} alt="" className="w-48" />
//         </div>
//         <div className="flex flex-col gap-2 rounded-3xl basis-2/3 bg-cyan-50 p-10">
//           <div className="title text-2xl font-bold px-4 p-2">
//             Basic Information
//           </div>
//           <div className="ml-3 p-2 px-4">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
//             culpa vitae eius.
//           </div>
//           <div className="ml-3 p-2 px-4">
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
//             nostrum.
//           </div>
//           <div className="ml-3 p-2 px-4">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
//             veniam, itaque voluptate atque possimus eius suscipit praesentium.
//             Suscipit placeat magnam assumenda omnis reprehenderit.
//           </div>
//           <div className="ml-3 p-2 px-4">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
//             exercitationem ratione nulla nobis culpa mollitia consequuntur
//             voluptatem labore officia!
//           </div>
//           <div className="ml-3 p-2 px-4">Lorem ipsum dolor sit amet.</div>
//         </div>
//       </div>
//       <div className="rounded-3xl ng-cyan-50 p-5 mt-0 m-10 flex flex-col bg-cyan-50">
//         <div className="ml-2 p-3 py-5 text-2xl font-bold">
//           More items from this region
//         </div>
//         <div className="flex gap-10 rounded-xl p-7 overflow-x-scroll">
//           {bikeData.map((bike) => (
//             <ItemCard
//               className="flex-shrink-0"
//               key={bike.id}
//               image={bike.image}
//               id={bike.id}
//               title={bike.title}
//               description={bike.description}
//               year={bike.year}
//               price={bike.price}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemPage;
