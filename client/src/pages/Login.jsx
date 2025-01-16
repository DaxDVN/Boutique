import React, { useEffect } from "react";
import AuthLayout from "../layouts/AuthLayout.jsx";
import AuthInput from "../components/AuthInput.jsx";
import useAuthForm from "../hooks/useAuthForm.js";
import { loginAsync } from "../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

function Login()
{
  const { input, handleChange, error, setError, setInput, handleSubmit } =
    useAuthForm(initialValues, validate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async () =>
  {
    const response = await dispatch(loginAsync(input));
    console.log(response);

    if (response.type.includes('fulfilled')) {
      navigate("/");
    } else {
      setError(response[`error`][`message`]);
      setInput({ ...input, password: "" });
    }
  };
  return (
    <AuthLayout>
      <form
        onSubmit={(e) => handleSubmit(e, submitForm)}
        className={"flex flex-col py-6"}
      >
        <AuthInput
          value={input.email}
          onChange={handleChange}
          label={"Email"}
          type="email"
          name="email"
        />
        <AuthInput
          value={input.password}
          onChange={handleChange}
          label={"Password"}
          type="password"
          name="password"
        />
        <div className={"border-t-2 border-neutral-300"}>
          {error && <p className={"pt-3 text-red-700"}>{error}</p>}
        </div>
        <button
          type={"submit"}
          className={
            "mt-6 w-full bg-neutral-700 p-4 uppercase text-white hover:bg-neutral-600"
          }
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  );
}

const validate = (data) =>
{
  if (data.email.trim() === "" || data.password.trim() === "") {
    return { error: "Every field is required" };
  }

  if (!data.email.includes("@")) {
    return { error: "Invalid email address" };
  }
  return { error: null };
};

export default Login;
