import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div
      className={
        "flex justify-center bg-black py-20 font-thin italic text-neutral-400 max-lg:flex-col max-lg:items-center max-lg:space-y-10 max-lg:text-center"
      }
    >
      <div className={"flex w-1/5 flex-col max-lg:w-1/2"}>
        <h2 className={"mb-4 text-lg font-normal uppercase text-white"}>
          Customer Services
        </h2>
        <Link to={""}>Help & Contact US</Link>
        <Link to={""}>Returns & Refunds</Link>
        <Link to={""}>Online Stores</Link>
        <Link to={""}>Terms & Conditions</Link>
      </div>

      <div className={"flex w-1/5 flex-col max-lg:w-1/2"}>
        <h2 className={"mb-4 text-lg font-normal uppercase text-white"}>
          Company
        </h2>
        <Link to={""}>What We Do</Link>
        <Link to={""}>Available Services</Link>
        <Link to={""}>Latest Posts</Link>
        <Link to={""}>FAQs</Link>
      </div>

      <div className={"flex w-1/5 flex-col max-lg:w-1/2"}>
        <h2 className={"mb-4 text-lg font-normal uppercase text-white"}>
          Social Media
        </h2>
        <Link to={""}>Twitter</Link>
        <Link to={""}>Instagram</Link>
        <Link to={""}>Facebook</Link>
        <Link to={""}>Pinterest</Link>
      </div>
    </div>
  );
}

export default Footer;
