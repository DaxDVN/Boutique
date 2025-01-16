import React from "react";
import {formatNumber} from "../utils.js";
import {useDispatch, useSelector} from "react-redux";
import {addCart, saveCartAsync} from "../store/cartSlice.js";
import ProductQuantity from "./ProductQuantity.jsx";
import { Bounce, toast } from "react-toastify";

function ProductInformation({product, togglePoup}) {
  const dispatch = useDispatch();
  const {listCart} = useSelector((state) => state.cart);
  const {currentUser} = useSelector((state) => state.auth);
  const handleAddToCart = async (quantity) => {
    if(!currentUser){
      toast.warn(`Please login before add to cart!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });
      return;
    }
    const cartItem = {
      ...product,
      quantity: quantity,
    };
    // Dispatch add to cart action with the selected quantity
    dispatch(addCart(cartItem))
    await dispatch(saveCartAsync(currentUser._id ));


    togglePoup();
  };

  return (
    <div className={"w-1/2 space-y-8"}>
      <h1 className={"text-3xl font-medium"}>{product[`name`]}</h1>
      <p className={"text-lg font-thin text-neutral-600"}>
        {formatNumber(product[`price`])} VND
      </p>
      <p className={"text-neutral-500"}>{product[`short_desc`]}</p>
      <p className={"text-neutral-500"}>
        <span className={"text-lg font-medium uppercase text-neutral-700"}>
          Category:{" "}
        </span>
        {product[`category`]}
      </p>
      <p>Stock: {product[`stock`]}</p>
      <div className={"flex"}>
        <div className={"flex items-center space-x-4 border-2 pl-4"}>
          <label className={"mr-10 font-medium uppercase text-neutral-500"}>
            Quantity
          </label>
          <ProductQuantity initState={1} maxState={product[`stock`]} handleAddToCart={handleAddToCart}/>
        </div>
      </div>
    </div>
  );
}

export default ProductInformation;
