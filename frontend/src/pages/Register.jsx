import { Input } from "@nextui-org/react";
import React from "react";

const Register = () => {
  return (
    <div className="flex h-dvh justify-center items-center">
      <div className="rounded-2xl flex flex-col bg-yellow-100">
        <form action="submit" className="flex flex-col p-10 gap-10">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            //   startContent={
            //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            //   }
          />
          <Input
            labelPlacement="outside"
            label="Password"
            placeholder="Enter your password"
            type={"password"}
            className="max-w-xs"
          />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
