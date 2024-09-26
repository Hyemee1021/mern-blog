import React, { useState } from "react";

import { Avatar, Dropdown, Navbar, Button, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// icon
import { AiOutlineSearch } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import {
  FaIcons,
  FaMoon,
  FaRegUserCircle,
  FaSun,
  FaUser,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import { toggleTheme } from "../redux/theme/themeSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);

  const [open, setOpen] = useState(true);
  console.log(open);

  const openToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="shadow-md">
      <Navbar fluid rounded className="w-11/12 md:w-4/5  mx-auto ">
        <Navbar.Brand as={Link} to="/">
          <span className="px-3 py-1  rounded-full text-white   drop-shadow bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500">
            HyeMee
          </span>
          's Blog
        </Navbar.Brand>

        <form class="max-w-sm mx-auto  md:flex hidden ">
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block rounded-md border-slate-400"
          />
          <Button>
            <AiOutlineSearch size={15} />
          </Button>
        </form>

        <Button className="w-10 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>

        {/* profile icon */}
        {currentUser && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                className="md:mr-3 sm:ml-3"
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>

            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        )}

        <Button onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </Button>

        {!currentUser && (
          <Button className="md:ml-3">
            <Link to="/signin">Sign in</Link>
          </Button>
        )}

        <CiMenuKebab
          size={22}
          className="md:hidden hover:bg-slate-200  rounded-full "
          onClick={openToggle}
        />

        <ul
          className={`${
            open ? "block" : "hidden"
          } w-full flex flex-col gap-3  lg:flex md:flex-row md:w-64 md:justify-around`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/">Projects</Link>
          </li>
        </ul>
      </Navbar>
    </div>
  );
};
