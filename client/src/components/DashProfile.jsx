import React from "react";
import { Avatar, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { DashSidebar } from "./DashSidebar";
export const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const theme = useSelector((state) => state.theme.theme);

  const sidebarBgClass = theme === "dark" ? "bg-slate-800" : "bg-slate-200";
  return (
    <div className=" flex flex-col md:flex-row">
      <DashSidebar className={sidebarBgClass} />
      <main className="mx-auto mt-8 w-full md:w-4/5">
        <h1 className="text-xl font-bold text-center">Profile</h1>
        <Avatar
          alt="User settings"
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          rounded
          size={15}
          className="mt-5"
        />
        <form className="flex flex-col gap-3 my-8 w-4/5  mx-auto md:w-3/6">
          <input
            type="text"
            placeholder="name"
            className="rounded-md"
            value={currentUser.username}
          />
          <input
            type="email"
            placeholder="email"
            className="rounded-md"
            value={currentUser.email}
          />
          <input type="password" className="rounded-md" placeholder="****" />
          <Button className="rounded-md border p-2 text-lg">Update</Button>
        </form>
        <div className="text-red-500 w-4/5 flex justify-between mx-auto mb-5">
          <p className="hover:cursor-pointer">Delete Account</p>
          <p className="hover:cursor-pointer">Sign out</p>
        </div>
      </main>
    </div>
  );
};
