import React, { useEffect, useState } from "react";
import banner from "../assets/banner1.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
function AuthLayout({ children })
{
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("Sign in");
  const { isLogin } = useSelector(state => state.auth)
  // Effect to update the mode based on the URL path
  useEffect(() =>
  {
    if (isLogin) {
      navigate("/")
    }
    if (location.pathname.includes("login")) {
      setMode("Sign in");
    } else {
      setMode("Sign up");
    }
  }, [location.pathname, mode]);

  // Handle the toggle between "Sign in" and "Sign up"
  const handleModeChange = (e) =>
  {
    if (mode === "Sign in") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={"flex w-full items-center justify-center px-96"}>
      <img src={banner} alt="" className={"absolute inset-y-0 h-full w-full"} />
      <div className={"z-20 w-full min-w-96 bg-white p-10 shadow-xl"}>
        <h1 className={"mb-10 text-center text-3xl italic text-neutral-600"}>
          {mode}
        </h1>
        {children}
        <div className={"mt-10 text-center italic"}>
          {mode === "Sign in" ? (
            <>
              <span className={"text-neutral-400"}>Create an account? </span>
              <span
                className={"cursor-pointer text-blue-400"}
                onClick={handleModeChange}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              <span className={"text-neutral-400"}>Login? </span>
              <span
                className={"cursor-pointer text-blue-400"}
                onClick={handleModeChange}
              >
                Click
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
