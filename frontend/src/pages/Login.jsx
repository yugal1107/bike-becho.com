import { useState } from "react";
import React from "react";
import { Input, Button } from "@nextui-org/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const provider = new GoogleAuthProvider();

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

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

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setResetSuccess("Password reset email sent!");
        setResetError("");
      })
      .catch((error) => {
        setResetError(error.message);
        setResetSuccess("");
      });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white text-xl font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Log In
          </Button>
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">or</span>
          </div>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white text-xl py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>
          {error && (
            <p className="mt-4 text-red-500 text-center bg-red-100 p-3 rounded-md">
              {error}
            </p>
          )}
        </form>
        <div className="mt-6 text-center">
          <Link to="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => setResetEmail(email)}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        {resetEmail && (
          <form onSubmit={handlePasswordReset} className="mt-4 space-y-4">
            <Input
              type="email"
              label="Reset Email"
              placeholder="Enter your email"
              fullWidth
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white text-xl font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Send Password Reset Email
            </Button>
            {resetError && (
              <p className="mt-4 text-red-500 text-center bg-red-100 p-3 rounded-md">
                {resetError}
              </p>
            )}
            {resetSuccess && (
              <p className="mt-4 text-green-500 text-center bg-green-100 p-3 rounded-md">
                {resetSuccess}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
