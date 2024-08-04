import React from "react";
import NavbarUI from "../components/Navbar/NavbarUI";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { currentUser } = useAuth();
  console.log("Home.jsx: user: ", currentUser);
  // console.log(user);

  return (
    <div>
      <NavbarUI />
    </div>
  );
};

export default Home;
