import React from "react";

import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// icon
import { AiOutlineSearch } from "react-icons/ai";
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
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <span className="px-3 py-1  rounded-full text-white   drop-shadow bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500">
          HyeMee
        </span>
        's Blog
      </Navbar.Brand>

      {/* profile icon */}
      {currentUser && (
        <div className="flex order-3">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
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
        </div>
      )}

      <div className="flex md:order-2 gap-3">
        <Button onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {!currentUser && (
          <Link to="/signin" className="hidden">
            <Button> Sign in</Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/projects">Projects</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
