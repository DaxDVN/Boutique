import React from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  return (
    <div className={" w-full border-b-2"}>
      <div className={"w-96 px-20 py-4 border-r-2 flex justify-center items-center"}>
        <h1
          className={"text-purple-600 font-semibold text-2xl cursor-pointer"}
          onClick={() => navigate("/")}>
          Admin Page
        </h1>
      </div>
    </div>
  );
}

export default Header;