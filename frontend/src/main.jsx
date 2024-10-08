import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NextUIProvider>
  </React.StrictMode>
);
