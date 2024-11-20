import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import img2 from "./assets/img2.jpeg";
import NavbarUI from "./components/Navbar/Navbar";
import ItemPage from "./pages/ItemPage/ItemPage";
import SellPage from "./pages/SellItem/SellPage";
import Profile from "./components/Profile";
// import { useForm } from 'react-hook-form';

const data = {
  id: 2,
  title: "Honda CB Shine",
  image: img2,
  price: "₹66,400",
  year: 2018,
  mileage: "20,000 km",
};

function App() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  return (
    <>
      {/* <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('firstName')} />
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" />
    </form> */}
      <Router>
        <NavbarUI />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item/:itemid" element={<ItemPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/profile" component={Profile} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
