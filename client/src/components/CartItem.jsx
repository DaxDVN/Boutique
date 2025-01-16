import React from "react";
import { formatNumber } from "../utils.js";
import ProductQuantity from "./ProductQuantity.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, removeCart, saveCartAsync, updateCart } from "../store/cartSlice.js";
import { server_url } from "../utils/config.js";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { listCart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);
  const updateCartItem = async (quantity) => {
    dispatch(updateCart({ ...item, quantity: quantity }));
    await dispatch(saveCartAsync(currentUser._id));

    dispatch(calculateTotal());
  };

  const removeCartItem = async () => {
    dispatch(removeCart(item));
    await dispatch(saveCartAsync(currentUser._id));
  };

  return (
    <tr>
      <td className={"flex items-center justify-center"}>
        <img src={item[`img1`].includes("http") ? item[`img1`] : server_url + item[`img1`]} alt={`product`}
             className={"w-24"} />
      </td>
      <td className={"font-semibold"}>{item[`name`]}</td>
      <td className={"text-neutral-600"}>{formatNumber(item[`price`])}</td>
      <td className={""}>
        <ProductQuantity
          initState={item[`quantity`]}
          handleUpdate={updateCartItem}
        />
      </td>
      <td className={"text-neutral-600"}>
        {formatNumber(item[`price`] * item[`quantity`])}
      </td>
      <td>
        <button onClick={removeCartItem}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
