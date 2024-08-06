import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Button } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

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
        // Signed up
        const user = userCredential.user;
        navigate("/login");
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };

  console.log(user);

  return (
    <div className="flex h-dvh justify-center items-center bg-yellow-200">
      <div className="rounded-2xl flex flex-col bg-white w-1/3 shadow-lg">
        <h1 className="text-3xl text-center p-7 rounded-2xl font-bold">
          Register Here
        </h1>
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="flex flex-col p-5 px-10 gap-10"
        >
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            onChange={(e) => setEmail(e.target.value)}
            //   startContent={
            //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            //   }
          />
          <Input
            labelPlacement="outside"
            label="Password"
            placeholder="Enter your password"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <button type="submit" className="btn-primary bg-yellow-500 rounded-lg p-2">
            Submit
          </button> */}
          <div className="flex flex-col justify-center items-center">
            <Button type="submit" className="bg-yellow-300 px-2">
              Submit
            </Button>
            {/* <p className="text-center"> or </p>
            <Button type="submit" className="bg-yellow-300 w-full">
              Continue with Google
            </Button> */}
          </div>
        </form>
        {error && (
          <p className="text-red-500 text-center bg-red-100 rounded-2xl p-3">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
