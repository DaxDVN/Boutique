import React from "react";
import support from "../assets/customer-service-support-svgrepo-com.svg";

function MessageItem({ text, role }) {
  return (
    <div
      className={
        "flex w-full items-start " +
        (role === "customer" ? "justify-end" : "justify-start")
      }
    >
      {role !== "customer" && (
        <div className="mr-3 h-8 w-8 flex-shrink-0">
          <img
            src={support}
            alt="Support Icon"
            className="h-full w-full object-contain"
          />
        </div>
      )}
      <div
        className={
          "max-w-44 rounded-md px-2 py-1 text-left " +
          (role === "customer"
            ? "bg-cyan-500 text-neutral-100"
            : "bg-neutral-200/50 text-neutral-500/60")
        }
      >
        {role === "customer" ? text : "ADMIN: " + text}
      </div>
    </div>
  );
}

export default MessageItem;
