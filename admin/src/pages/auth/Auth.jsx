import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { getAuth } from "../../utils/auth.js";

function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      navigate("/");
    }
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    setIsLogin(mode !== "register");
  }, [location]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <div className={"flex w-full justify-center items-center mt-20"}>
        <div className="flex flex-col justify-center items-center w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6">{isLogin ? "Admin Login" : "Register"}</h2>

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

export default Auth;
