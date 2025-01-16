import React, { memo } from "react";

function AuthInput({ label, value, onChange, type, name }) {
  return (
    <input
      type={type}
      className={"border-x-2 border-t-2 border-neutral-300 p-4 outline-none"}
      placeholder={label}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
}

export default memo(AuthInput);
