import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { signoutSuccess } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

export const DashSidebar = ({ className }) => {
  console.log(className);
  return (
    <aside className={`w-full md:w-1/5 ${className}`}>
      <div>
        <ul className="flex flex-col gap-3 p-3">
          <li>
            <Link to="/dashboard" className="flex gap-2 flex-row items-center">
              <span> Dashboard</span>
              <HiTable />
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex gap-2  flex-row items-center">
              Profile
              <HiUser />
            </Link>
          </li>
          <li>
            <Link to="/signout" className="flex flex-row items-center gap-2">
              Signout
              <HiArrowSmRight />
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
