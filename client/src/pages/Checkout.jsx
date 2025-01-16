import React, {useCallback, useEffect, useState} from "react";
import InputCheckout from "../components/InputCheckout.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {formatNumber} from "../utils.js";
import {getUser} from "../apis/users.js";
import {Bounce, toast} from "react-toastify";
import {checkoutAsync} from "../store/cartSlice.js";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
};

function Checkout(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {listCart, totalPrice} = useSelector((state) => state.cart);
  const {currentUser} = useSelector((state) => state.auth);
  const [input, setInput] = useState(initialState);
  const [error, setError] = useState("");
  useEffect(() => {
    if (listCart.length === 0) {
      navigate("/shop");
    }
    const fetchUser = async () => {
      try {
        const response = await getUser(currentUser._id)
        if (response?.user) {
          setInput({
            ...input,
            fullName: response?.user.fullName || "",
            email: response?.user.email || "",
            phone: response?.user.phoneNumber || "",
          })
        }
      } catch (error) {
        toast.error('Failed to fetch user!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
    fetchUser()
  }, []);

  const handleChange = useCallback(
    (e) => {
      setError("")
      setInput({...input, [e.target.name]: e.target.value});
    },
    [input],
  );

  const handleSubmit = async () => {
    for (const entry of Object.entries(input)) {
      if (entry[1] === "") {
        setError("Please fill out the form");
        return;
      }
    }
    const response = await dispatch(checkoutAsync({
      id: currentUser._id,
      billingDetails: input
    }))
    if(response.type.includes("fulfilled")){
      navigate("/shop");
    }
  }

  return (
    <div className={"w-full italic"}>
      <div className={"my-6 flex justify-between bg-amber-50 px-10 py-14"}>
        <h1 className={"text-3xl font-semibold"}> CHECKOUT</h1>
        <h3 className={"font-medium text-neutral-500"}>
          HOME / CART / <span className={"text-neutral-400"}>CHECKOUT</span>
        </h3>
      </div>
      <div>
        <h2 className={"text-2xl font-semibold uppercase text-neutral-800"}>
          Billing details
        </h2>
        <div className={"flex space-x-10"}>
          <div
            className={
              "w-7/12 space-y-4 py-6 font-semibold uppercase text-neutral-500"
            }
          >
            <InputCheckout
              handleChange={handleChange}
              value={input.fullName}
              label={"Full Name"}
              name={"fullName"}
            />
            <InputCheckout
              handleChange={handleChange}
              value={input.email}
              label={"Email"}
              name={"email"}
            />
            <InputCheckout
              handleChange={handleChange}
              value={input.phone}
              label={"Phone Number"}
              name={"phone"}
            />
            <InputCheckout
              handleChange={handleChange}
              value={input.address}
              label={"Address"}
              name={"address"}
            />
            {error && (
              <p className={"text-red-700 capitalize"}>{error}</p>
            )}
            <button
              className={
                "bg-neutral-800 px-4 py-2 italic text-white hover:bg-neutral-700"
              }
              onClick={handleSubmit}
            >
              Place order
            </button>
          </div>
          <div className={"w-5/12 py-12"}>
            <h2 className={"text-xl font-semibold uppercase text-neutral-600"}>
              Your Order
            </h2>
            <div className={"py-6"}>
              {listCart.length > 0 &&
                listCart.map((item, index) => (
                  <div
                    key={index}
                    className={
                      "space flex w-full justify-between border-b-2 border-neutral-300 py-2 font-semibold text-neutral-700"
                    }
                  >
                    {item[`name`]}
                    <span className={"font-normal text-neutral-500"}>
                      {formatNumber(item[`price`])} VND x {item[`quantity`]}
                    </span>
                  </div>
                ))}
              <div
                className={
                  "flex justify-between py-2 font-semibold text-neutral-700"
                }
              >
                TOTAL
                <span className={"font-medium text-neutral-600"}>
                  {formatNumber(totalPrice)} VND
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
