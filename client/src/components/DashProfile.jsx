import React from "react";
import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
export const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="profile image"
            className="rounded-full w-full h-full border-8 border-[lightgray] objeoct-cover"
          />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput id="password" type="password" placeholder="password" />
      </form>
    </div>
  );
};
