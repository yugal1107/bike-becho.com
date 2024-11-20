import React, { useState } from "react";
import CardList from "../components/Card/CardList";
import ToggleSwitch from "../components/ToggleSwitch";

const Home = () => {
  const [view, setView] = useState("buy");

  return (
    <div className="lg:px-52 lg:py-12">
      <ToggleSwitch view={view} setView={setView} />
      <CardList view={view} />
    </div>
  );
};

export default Home;