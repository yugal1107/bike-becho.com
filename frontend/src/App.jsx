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
          <Route path="/sell" element={<SellPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages/:buyRequestId" element={<Messages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
