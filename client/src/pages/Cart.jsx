import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import
{
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "../store/cartSlice.js";
import CartItem from "../components/CartItem.jsx";
import CartCheckout from "../components/CartCheckout.jsx";

function Cart()
{
  const { listCart } = useSelector((state) => state.cart);
  console.log(listCart);
  const { isLogin } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() =>
  {
    if (!isLogin) {
      navigate("/")
    }
    dispatch(calculateTotal());
  }, [dispatch]);

  return (
    <div className={"w-full italic"}>
      <div className={"my-6 flex justify-between bg-amber-50 px-10 py-14"}>
        <h1 className={"text-3xl font-semibold"}> CART</h1>
        <h3 className={"font-medium text-neutral-500"}>CART</h3>
      </div>
      <div>
        <h2 className={"text-2xl font-semibold uppercase text-neutral-800"}>
          Shopping Cart
        </h2>
        <div className={"my-4 flex bg-gray-100 p-4"}>
          <div className={"w-3/4 p-4"}>
            <table className={"mb-16 w-full text-center"}>
              <thead>
                <tr className={"uppercase text-neutral-500"}>
                  <th>image</th>
                  <th>product</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <th>remove</th>
                </tr>
              </thead>
              {listCart.length > 0 && (
                <tbody>
                  {listCart.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                </tbody>
              )}
            </table>
            {listCart.length === 0 && (
              <div className={"mb-20 text-center text-lg font-semibold"}>
                There is nothing in your cart
              </div>
            )}
            <div className={"flex justify-between"}>
              <div className={"space-x-2"}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <Link to="/shop">Continue Shopping</Link>
              </div>
              <div
                className={`w-fit space-x-2 border-2 p-2 text-neutral-700 duration-300 ease-in-out ${listCart.length === 0 ? "cursor-not-allowed opacity-50" : "hover:bg-neutral-700 hover:text-white"} border-neutral-800`}
              >
                <FontAwesomeIcon icon={faArrowRightLong} />
                {listCart.length === 0 ? (
                  <span>Proceed to checkout</span>
                ) : (
                  <Link to="/checkout">Proceed to checkout</Link>
                )}
              </div>
            </div>
          </div>
          <CartCheckout />
        </div>
      </div>
    </div>
  );
}

export default Cart;
