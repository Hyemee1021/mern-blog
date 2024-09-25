import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSidebar } from "../components/DashSidebar";
import { DashProfile } from "../components/DashProfile";

export const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <DashSidebar />
    </div>
  );
};
