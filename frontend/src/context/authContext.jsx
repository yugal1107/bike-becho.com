// UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
