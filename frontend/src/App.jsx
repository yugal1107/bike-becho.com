import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import NavbarUI from "./components/Navbar/Navbar";
import ItemPage from "./pages/ItemPage/ItemPage";
import SellPage from "./pages/SellItem/SellPage";
import Profile from "./components/ProfileSection";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import RentPage from "./pages/RentPage/RentPage";
import RentItemPage from "./pages/RentPage/RentItemPage";
import RentForm from "./pages/RentPage/RentForm";
import Chatbot from "./components/ChatBot";

function App() {
  return (
    <Router>
      <NavbarUI />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/item/:itemid" element={<ItemPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/rent/:itemid" element={<RentItemPage />} />
        <Route path="/rent-form" element={<RentForm />} />
      </Routes>
    </Router>
  );
}

export default App;