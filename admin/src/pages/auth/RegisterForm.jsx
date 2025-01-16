import React, { useState } from "react";
import { register } from "../../apis/auth.js";
import { Bounce, toast } from "react-toastify";

function RegisterForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
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

    if (!input.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!input.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(input.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }

    if (!input.password) {
      newErrors.password = "Password is required.";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!input.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    }

    if (input.password !== input.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const response = await register(input);
      console.log(response);

      if (!response.success) {
        setErrors({
          ...errors,
          messages: response.messages
        });
      } else {
        toast.success("Register successfully!", {
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
      }
    } catch (err) {
      toast.error(err.message, {
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
    }
  };


  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={input.email}
          onChange={handleChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          name="fullName"
          value={input.fullName}
          onChange={handleChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          placeholder="Enter your phone number"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={handleChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
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
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={input.confirmPassword}
          onChange={handleChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>
      <div>
        {errors.messages && errors.messages?.length > 0 && (
          <div className={"text-red-500"}>
            {errors.messages.map((message, i) => (
              <div key={i}>
                {message.msg}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
