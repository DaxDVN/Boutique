import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";

function ProductQuantity({ initState, maxState, handleUpdate, handleAddToCart }) {
  const [quantity, setQuantity] = useState(initState || 1);

  const increaseQuantity = () => {
    if (quantity + 1 > maxState) {
      toast.warn(`You can not add more than ${maxState} quantity!`, {
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
    } else {
      if (handleUpdate) {
        handleUpdate(quantity + 1);
      }
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity - 1 >= 1) {
      if (handleUpdate) {
        handleUpdate(quantity - 1);
      }
      setQuantity(quantity - 1);
    }
  };

  const addTocart = () => {
    handleAddToCart(quantity);
    setQuantity(1);
  };

  return (
    <>
      <div className={"flex"}>
        <button
          className={
            "flex aspect-square cursor-pointer items-center justify-center p-2"
          }
          onClick={decreaseQuantity}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div>
          <input
            type="text"
            className={"h-full w-8 text-center outline-none"}
            value={quantity}
            onChange={() => {
            }}
          />
        </div>
        <button
          className={
            "flex aspect-square cursor-pointer items-center justify-center p-2"
          }
          onClick={increaseQuantity}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      {handleAddToCart && (
        <button
          className={"bg-neutral-700 px-4 py-2 font-thin italic text-white"}
          onClick={addTocart}
        >
          Add to cart
        </button>
      )}
    </>
  );
}

export default ProductQuantity;
