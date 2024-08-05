import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bikeData } from "../../Data/CardData";

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
    <div className="bg-cyan-50 h-dvh">
      <div className="flex gap-5 p-10 bg-cyan-50 rounded-3xl">
        <div className="image rounded-xl basis-1/3">
          <img src={item.image} alt="" />
        </div>
        <div className="flex flex-col gap-2 rounded-xl basis-2/3">
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
    </div>
  );
};

export default ItemPage;
