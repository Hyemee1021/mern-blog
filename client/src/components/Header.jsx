import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1  rounded-full text-white   drop-shadow bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-500">
          HyeMee
        </span>
        's Blog
      </Link>
    </Navbar>
  );
};
