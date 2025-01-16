import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function SideBarElement({ element }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    navigate("/auth");
  };
  return (
    <div>
      <div className="mt-4 ml-8 text-neutral-400 font-semibold">
        {element[0]}
      </div>
      <div className="flex flex-col space-y-1 pl-8 pr-4 my-2">
        {[...element[1]].map((tag, index) => (
          <div key={index} className="w-full">
            {tag.path ? (
              <NavLink
                to={tag.path}
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg ${
                    isActive
                      ? "bg-neutral-100/70 text-purple-600"
                      : "text-neutral-500 hover:bg-neutral-100/70"
                  }`
                }
              >
                <FontAwesomeIcon icon={tag.icon} className="mr-3" />
                <span>{tag.tag}</span>
              </NavLink>
            ) : (
              <button
                className="flex items-center py-2 px-3 rounded-lg text-neutral-500 hover:bg-neutral-100/70 w-full"
                onClick={handleLogout}>
                <FontAwesomeIcon icon={tag.icon} className="mr-3 text-purple-600" />
                <span>{tag.tag}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarElement;
