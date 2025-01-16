import React, { memo } from "react";

function InputCheckout({ label, handleChange, value, name }) {
  return (
    <div className={"space-y-2"}>
      <label>{label}:</label>
      <input
        type={name !== "email" ? "text" : "email"}
        className={
          "w-full border-2 border-neutral-300 p-2 font-normal outline-none"
        }
        placeholder={label}
        onChange={handleChange}
        value={value}
        name={name}
      />
    </div>
  );
}

export default memo(InputCheckout);
