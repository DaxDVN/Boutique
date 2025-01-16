import React from "react";

function ServiceCard({ label }) {
  return (
    <div
      className={
        "col-span-1 flex flex-col items-center bg-neutral-100 p-10 italic"
      }
    >
      <h3 className={"text-xl font-medium uppercase text-neutral-700"}>
        {label}
      </h3>
      <p className={"text-sm font-thin text-neutral-500"}>
        Free shipping worldwide
      </p>
    </div>
  );
}

export default ServiceCard;
