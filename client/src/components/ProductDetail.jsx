import React from "react";
import { createPortal } from "react-dom";
import { formatNumber } from "../utils.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "../store/productSlice.js";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { useNavigate } from "react-router-dom";
import { server_url } from "../utils/config.js";

function ProductDetail() {
  const { selectedProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(hidePopup());
  };

  const viewDetail = () => {
    dispatch(hidePopup());
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    navigate("/detail/" + selectedProduct[`_id`]);
  };

  return createPortal(
    <div>
      {selectedProduct && (
        <>
          <div
            className={
              "fixed inset-0 z-20 flex items-center justify-center italic"
            }
          >
            <div
              className="absolute inset-0 bg-neutral-900/70"
              onClick={handleClose}
            />

            <div
              className={
                "relative z-30 flex w-1/2 bg-white px-6 py-20 max-2xl:w-2/3"
              }
            >
              <div
                className={
                  "absolute right-4 top-4 cursor-pointer text-neutral-600"
                }
              >
                <FontAwesomeIcon icon={faClose} onClick={handleClose} />
              </div>

              <img
                src={selectedProduct[`img1`].includes("http") ? selectedProduct[`img1`] : server_url + selectedProduct[`img1`]}
                alt="" className={"w-1/2"} />
              <div className={"space-y-2 p-4"}>
                <h3 className={"px-2 text-xl font-semibold text-neutral-700"}>
                  {selectedProduct[`name`]}
                </h3>
                <p className={"text-md px-2 text-neutral-600"}>
                  {formatNumber(selectedProduct[`price`])} VND
                </p>
                <p className={"px-2 text-sm text-neutral-600/70"}>
                  {selectedProduct[`short_desc`]}
                </p>
                <button
                  className={
                    "w-52 space-x-1 bg-neutral-800/95 px-8 py-1 italic text-white hover:bg-neutral-800/80"
                  }
                  onClick={viewDetail}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span> View Detail</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>,
    document.getElementById("portal-root")
  );
}

export default ProductDetail;
