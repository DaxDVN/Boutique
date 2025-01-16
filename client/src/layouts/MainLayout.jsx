import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import LiveChat from "../components/LiveChat.jsx";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div
        className={
          "relative flex flex-grow items-center justify-center px-96 max-2xl:px-60 max-xl:px-20 max-lg:px-10"
        }
      >
        <Outlet />
        <LiveChat />
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
