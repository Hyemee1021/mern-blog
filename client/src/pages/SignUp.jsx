import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="min-h-screen mt-20 border ">
      <div className="flex p-3 max-w-3xl md:mx-auto  gap-7 flex-col md:flex-row md:items-center border mx-5">
        {/* left */}
        <div className="flex-1 ">
          <Link
            to="/"
            className="self-center text-3xl font-bold dark:text-white"
          >
            <span className="px-3 py-1  rounded-full text-white   drop-shadow bg-gradient-to-r from-pink-500 via-yello-500 to-orange-500">
              HyeMee
            </span>
            's Blog
          </Link>
          <p className="text-sm mt-5">
            {" "}
            This is a demo project. You can sign up or use "a@a.com" ,"1234" to
            explore my project.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button type="submit" gradientDuoTone="pinkToOrange">
              Sign Up
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-2">
            <span>Have an account?</span>
            <Link to="/signin" className=" font-semibold text-blue-600">
              here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
