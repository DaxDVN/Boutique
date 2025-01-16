import React, { useEffect, useState } from "react";
import {
  faHardDrive,
  faHotel,
  faRightFromBracket,
  faTruck,
  faUser,
  faWindowMaximize,
  faMessage
} from "@fortawesome/free-solid-svg-icons";
import SideBarElement from "./SideBarElement.jsx";

const sideBarElement = {
  "MAIN": [{
    tag: "Dashboard", path: "/", icon: faHardDrive
  }],
  "LIST": [ {
    tag: "Products", path: "/products", icon: faWindowMaximize
  }],
  "NEW": [{
    tag: "New Product", path: "/product-new", icon: faWindowMaximize
  }],
  "CHAT": [{
    tag: "Chat", path:"/chat", icon: faMessage
  }],
  "USER": [{
    tag: "Logout", icon: faRightFromBracket
  }]
};

function Sidebar() {
  const [user, setUser] = useState({
    role: "admin"
  });
  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    if (auth) {
      setUser(auth);
    }
  }, [])
  return (
    <div className="py-3 w-96 border-r-2">
      {Object.entries(sideBarElement).map((element, index) => {
        if(user.role === "consultant" && (element[0] !== "CHAT" && element[0] !== "USER")) {
          return null
        }
        return (
          <SideBarElement element={element} key={index} />
        )
      })}
    </div>
  );
}


export default Sidebar;
