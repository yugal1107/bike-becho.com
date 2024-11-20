import React from "react";
import NavbarUI from "../components/Navbar/Navbar";
import { useAuth } from "../context/authContext";
import CardList from "../components/Card/CardList";

const Home = () => {
  const { currentUser } = useAuth();
  console.log("Home.jsx: user: ", currentUser);

  return (
    <div className="lg:px-52 lg:py-12">
      {/* <NavbarUI /> */}
      <CardList />
    </div>
  );
};

export default Home;
