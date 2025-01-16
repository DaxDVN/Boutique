import React, { useState } from "react";
import { login } from "../../apis/auth.js";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    messages: []
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
      messages: []
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!input.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!input.password.trim()) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = (await login(input));
    const result = response.result;
    if (result.role === "customer") {
      toast.error("You are not admin or consultant!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });
      return;
    }
    if (!result.success) {
      setErrors({
        ...errors,
        messages: result.messages
      });
    }
    if (result.token) {
      toast.success("Login successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });
      const expireAt = Date.now() + 3600000;
      const auth = {
        authToken: result.token,
        tokenExpireAt: expireAt,
        email: result.email,
        _id: result._id,
        role: result.role
      };
      sessionStorage.setItem("auth", JSON.stringify(auth));
      if(auth.role === "admin") {
        navigate("/");
      }else{
        navigate("/chat");
      }
    }

  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={input.email}
          onChange={handleChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={input.password}
          onChange={handleChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div>
        {errors.messages && errors.messages?.length > 0 && (
          <div className={"text-red-500"}>
            {errors.messages.map((message, i) => (
              <div key={i}>
                {message.msg || message}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        Login
      </button>
      <div>
        <div>
          Admin Account: <div className={"text-xl font-bold"}>iam.admin@funix.edu.vn</div>
        </div>
        <div>
          Admin Password: <div className={"text-xl font-bold"}>funix123456</div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
