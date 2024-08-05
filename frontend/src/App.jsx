import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import img2 from "./assets/img2.jpeg";
import NavbarUI from "./components/Navbar/Navbar";
import ItemPage from "./pages/ItemPage/ItemPage";

const data = {
  id: 2,
  title: "Honda CB Shine",
  image: img2,
  price: "₹66,400",
  year: 2018,
  mileage: "20,000 km",
};

function App() {
  return (
    <>
      <Router>
        <NavbarUI />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item/:itemid" element={<ItemPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
