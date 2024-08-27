import { useState } from "react";
import React from "react";
import { Input, Button } from "@nextui-org/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform transform hover:scale-[1.1]">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
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
            className="w-full bg-sky-400 text-white hover:bg-green-600"
          >
            Log In
          </Button>
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">or</span>
          </div>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-sky-400 text-white hover:bg-green-600"
          >
            Continue with Google
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
