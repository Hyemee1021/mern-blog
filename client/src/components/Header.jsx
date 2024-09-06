import { Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// icons
import { IoSearchOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
export const Header = () => {
  // getting path name from url
  const location = useLocation();
  const path = location.pathname;

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1  rounded-full text-white   drop-shadow bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500">
          HyeMee
        </span>
        's Blog
      </Link>
      <form action="">
        <TextInput
          type="text"
          placeholder="Search .."
          className="hidden lg:inline"
          rightIcon={IoSearchOutline}
        />
      </form>
      <div className="flex justify-center items-center  border w-12 h-12  rounded-lg lg:hidden hover:bg-gray-200">
        <button className="flex justify-center items-center ">
          <IoSearchOutline className="text-gray-500 " size={20} />
        </button>
      </div>
      {/* theme and signin button when its small size comes before when its on large screen it comes at
      the end */}
      <div className="flex gap-3 md:order-2">
        <div className="flex justify-center items-center  border w-12 h-12  rounded-lg  hover:bg-gray-200">
          <button className="flex justify-center items-center ">
            <FaMoon size={18} />
          </button>
        </div>
        <Link
          to="/sign-in"
          className=" font-semibold text-sm text-black flex justify-center items-center  border w-12 h-12  rounded-lg lg:hidden   hover:bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500 hover:text-white "
        >
          <button className="flex justify-center items-center ">Signin</button>
        </Link>
      </div>
      <Navbar.Toggle />
      {/*  menu  */}
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/sign-up"} as={"div"}>
          <Link to="/sign-up">Signup</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
