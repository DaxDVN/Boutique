import React from "react";
import banner from "../assets/banner1.jpg";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <div className={"relative"}>
      <img
        src={banner}
        alt="banner"
        className={"h-full w-full object-cover object-center"}
      />
      <div
        className={
          "absolute inset-0 left-10 flex flex-col justify-center space-y-4 italic"
        }
      >
        <p className={"text-lg font-thin uppercase text-neutral-400"}>
          New Inspiration 2020
        </p>
        <h2 className={"w-2/3 max-w-xl text-5xl uppercase"}>
          20% off on new season
        </h2>
        <button
          className={
            "w-52 bg-neutral-700 px-6 py-2 text-lg font-thin italic text-neutral-300"
          }
          onClick={() => navigate("/shop")}
        >
          Browse collections
        </button>
      </div>
    </div>
  );
}

export default Banner;
