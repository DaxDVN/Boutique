import React from "react";
import AuthLayout from "../layouts/AuthLayout.jsx";
import AuthInput from "../components/AuthInput.jsx";
import useAuthForm from "../hooks/useAuthForm.js";
import { useDispatch } from "react-redux";
import { registerAsync } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
};

function Register()
{
  const { handleChange, input, error, handleSubmit, setError } = useAuthForm(
    initialValues,
    validate,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = async () =>
  {
    const response = await dispatch(registerAsync(input));
    console.log(response);

    if (response.type.includes('fulfilled')) {
      navigate("/login");
    } else {
      setError(response[`payload`][`message`]);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => handleSubmit(e, submitForm)}
        className={"flex flex-col pt-6"}
      >
        <AuthInput
          value={input.fullName}
          onChange={handleChange}
          label={"Fullname"}
          type="text"
          name="fullName"
        />
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
        <AuthInput
          value={input.phone}
          onChange={handleChange}
          label={"Phone"}
          type="text"
          name="phone"
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
          Sign up
        </button>
      </form>
    </AuthLayout>
  );
}

const validate = (values) =>
{
  if (!values.email || !values.password || !values.fullName || !values.phone) {
    return { error: "Every field is required" };
  }

  if (
    values.email.trim() === "" ||
    values.password.trim() === "" ||
    values.fullName.trim() === "" ||
    values.phone.trim() === ""
  ) {
    return { error: "Every field is required" };
  }

  if (!values.email.includes("@")) {
    return { error: "Invalid email address" };
  }

  if (values.password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  if (values.phone.length < 10 || values.phone.length > 12) {
    return { error: "Phone must be from 10 to 12 characters" };
  }
  return { error: null };
};

export default Register;
