import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { app } from "../firebase";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            alert("Verification email sent! Please check your inbox.");
            navigate("/login");
          })
          .catch((error) => {
            setError("Error sending verification email: " + error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-[1.1]">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-green-600 transition-colors"
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
