import React from "react";
import NavbarUI from "../components/Navbar/Navbar";
import { useAuth } from "../context/authContext";
import Card from "../components/Card/CardList";

const Home = () => {
  const { currentUser } = useAuth();
  console.log("Home.jsx: user: ", currentUser);

  return (
    <div className="lg:px-52 lg:py-12">
      <Card></Card>
    </div>
  );
};

export default Home;
