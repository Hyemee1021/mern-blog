import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FooterComponent } from "./FooterComponent";
export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
};
