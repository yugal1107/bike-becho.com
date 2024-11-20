import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      await sendEmailVerification(user);
      alert("Verification email sent! Please check your inbox.");
      navigate("/login");
    } catch (error) {
      setError("Error creating account: " + error.message);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            label="Name"
            placeholder="Your Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white text-xl hover:bg-blue-700 transition-colors duration-300"
          >
            Register
          </Button>
          {error && (
            <p className="mt-4 text-red-500 text-center bg-red-100 p-3 rounded-md">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
