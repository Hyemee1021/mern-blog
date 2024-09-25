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
// import { signoutSuccess } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

export const DashSidebar = () => {
  return (
    <div className="h-screen">
      <Sidebar aria-label="Default sidebar example" className="h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie} active>
              Dashboard
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
