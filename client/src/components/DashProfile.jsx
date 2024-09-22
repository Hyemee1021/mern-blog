import React from "react";
import { useSelector } from "react-redux";
export const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Profile</h1>
      <form className="flex flex-col">
        <div className="w-32 h-32 self-center">
          <img
            src={currentUser.profilePicture}
            alt="profile image"
            className="rounded-full w-full h-full border-8 border-[lightgray] objeoct-cover"
          />
          {/* 4:11 */}
        </div>
      </form>
    </div>
  );
};
