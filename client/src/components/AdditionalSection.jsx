import React from "react";
import ServiceCard from "./ServiceCard.jsx";

function AdditionalSection() {
  return (
    <div className={"space-y-14 py-10"}>
      <div
        className={
          "grid grid-cols-3 gap-2 max-md:flex max-md:flex-col 2xl:scale-110"
        }
      >
        <ServiceCard label={"free shipping"} />
        <ServiceCard label={"24 x 7 service"} />
        <ServiceCard label={"festival offer"} />
      </div>

      <div className={"flex justify-between"}>
        <div className={"w-1/2 italic"}>
          <h2
            className={
              "text-3xl font-semibold uppercase text-neutral-700 max-2xl:text-xl"
            }
          >
            let&#39;s be friends!
          </h2>
          <p className={"text-lg text-neutral-400 max-2xl:text-sm"}>
            Lorem ipsum dolor sit amet ipsum dolor sit.
          </p>
        </div>
        <div className={"flex w-1/2"}>
          <input
            type="text"
            className={"flex-grow border-2 border-neutral-200 p-4 outline-none"}
            placeholder={"Enter your email address"}
          />
          <button className={"bg-neutral-800 p-4 text-white"}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default AdditionalSection;
