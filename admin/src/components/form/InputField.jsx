import React from "react";

const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="w-2/5 mt-6">
    <label htmlFor={name} className="font-semibold">{label}</label>
    <br />
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="border-b border-neutral-400 w-full outline-none p-2"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border-b border-neutral-400 w-full outline-none p-2"
        placeholder={placeholder}
      />
    )}
  </div>
);

export default InputField;