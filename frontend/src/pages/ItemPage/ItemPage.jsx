import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bikeData } from "../../Data/CardData";
import ItemCard from "../../components/Card/ItemCard";

const ItemPage = () => {
  const { itemid } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const item = bikeData.find((item) => item.id === Number(itemid));
    // console.log(item);
    setItem(item);
  }, [itemid]);

  // const [loading, setLoading] = useState(true);
  return (
    <div className="h-dvh">
      <div className="flex gap-5 p-10 rounded-3xl">
        <div className="image rounded-3xl basis-1/3 bg-cyan-50 flex items-center justify-center">
          <img src={item.image} alt="" className="w-48" />
        </div>
        <div className="flex flex-col gap-2 rounded-3xl basis-2/3 bg-cyan-50 p-10">
          <div className="title text-2xl font-bold px-4 p-2">
            Basic Information
          </div>
          <div className="ml-3 p-2 px-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            culpa vitae eius.
          </div>
          <div className="ml-3 p-2 px-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
            nostrum.
          </div>
          <div className="ml-3 p-2 px-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
            veniam, itaque voluptate atque possimus eius suscipit praesentium.
            Suscipit placeat magnam assumenda omnis reprehenderit.
          </div>
          <div className="ml-3 p-2 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            exercitationem ratione nulla nobis culpa mollitia consequuntur
            voluptatem labore officia!
          </div>
          <div className="ml-3 p-2 px-4">Lorem ipsum dolor sit amet.</div>
        </div>
      </div>
      <div className="rounded-3xl ng-cyan-50 p-5 mt-0 m-10 flex flex-col bg-cyan-50">
        <div className="ml-2 p-3 py-5 text-2xl font-bold">
          More items from this region
        </div>
        <div className="flex gap-10 rounded-xl p-7 overflow-x-scroll">
          {bikeData.map((bike) => (
            <ItemCard
              className="flex-shrink-0"
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
      </div>
    </div>
  );
};

export default ItemPage;
