import React from "react";
import { formatNumber } from "../utils.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons/faGift";
import { useSelector } from "react-redux";

function CartCheckout(props) {
  const { totalPrice } = useSelector((state) => state.cart);

  return (
    <div className={"space-y-4 px-4 py-8 uppercase text-neutral-700"}>
      <h3 className={"text-xl font-semibold"}>Cart total</h3>
      <div className={"flex justify-between"}>
        <label className={"font-semibold"}> Subtotal</label>
        <span className={"text-neutral-400"}>
          {formatNumber(totalPrice)} vND
        </span>
      </div>
      <div className={"flex justify-between"}>
        <label className={"font-semibold"}> Total</label>
        <span className={"text-neutral-500"}>
          {formatNumber(totalPrice)} vND
        </span>
      </div>
      <div>
        <input
          type="text"
          placeholder={"Enter your coupon"}
          className={"w-full border-2 border-neutral-300 p-2 outline-none"}
        />
        <button
          className={
            "w-full bg-neutral-700 py-2 text-neutral-100 hover:bg-neutral-600"
          }
        >
          <FontAwesomeIcon icon={faGift} />
          Apply coupon
        </button>
      </div>
    </div>
  );
}

export default CartCheckout;
