import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/layouts/Header.jsx";
import Sidebar from "../components/layouts/Sidebar.jsx";
import { getAuth } from "../utils/auth.js";

function MainLayout(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      navigate("/auth");
    }
  }, []);
  return (
    <div className={"min-h-screen flex flex-col"}>
      <Header />
      <div className={"flex flex-1"}>
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;