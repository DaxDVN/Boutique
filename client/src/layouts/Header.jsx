import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {Link, useNavigate} from "react-router-dom";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {useDispatch, useSelector} from "react-redux";
import {onLogout} from "../store/authSlice.js";

function Header() {
  const {isLogin, currentUser} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(onLogout());
    navigate("/");
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div
      className={
        "sticky inset-x-0 top-0 z-50 flex justify-between bg-white px-96 py-4 text-lg italic max-2xl:px-60 max-xl:px-20 max-lg:px-10"
      }
    >
      <div className={"flex space-x-4"}>
        <Link to={"/"} className={"text-yellow-500"}>
          Home
        </Link>
        <Link to={"/shop"}>Shop</Link>
      </div>
      <div>
        <h1 className={"text-xl font-medium"}>BOUTIQUE</h1>
      </div>
      <div className={"flex space-x-4"}>
        {isLogin ? (
          <>
            <div>
              <Link to={"/cart"}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={"mr-2 w-4 text-neutral-400"}
                />
                Cart
              </Link>
            </div>
            <div
              className="flex items-center cursor-pointer relative"
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={"mr-1 w-4 text-neutral-400"}
              />
              {currentUser.fullName}
              <FontAwesomeIcon
                icon={faCaretDown}
                className={"ml-1 w-4 text-neutral-700"}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 top-8 mt-2 bg-white border rounded-md shadow-lg font-semibold">
                  <button
                    onClick={() => navigate("/cart")}
                    className="block w-full px-16 py-2 text-left text-neutral-700 hover:bg-gray-100"
                  >
                    Cart
                  </button>
                  <button
                    onClick={() => navigate("/history")}
                    className="block w-full px-16 py-2 text-left text-neutral-700 hover:bg-gray-100"
                  >
                    History
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-16 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>


          </>
        ) : (
          <div>
            <Link to={"login"}>
              <FontAwesomeIcon
                icon={faUser}
                className={"mr-2 w-4 text-neutral-400"}
              />
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
