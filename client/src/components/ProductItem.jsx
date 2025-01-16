import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatNumber } from "../utils.js";
import { useDispatch } from "react-redux";
import { showPopup } from "../store/productSlice.js";
import { server_url } from "../utils/config.js";

function ProductItem({ src, style, item })
{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () =>
  {
    setIsImageLoaded(true);
  };

  const handleClick = () =>
  {
    if (item == null) {
      navigate("/shop");
    }
    if (location.pathname === "/") {
      dispatch(showPopup(item));
    } else {
      navigate("/detail/" + item[`_id`]);
      window.location.reload()
    }
  };

  return (
    <div className={style}>
      {isImageLoaded === false && (
        <div className={"text-center text-lg"}>Loading image...</div>
      )}

      <img
        src={src.includes("http") ? src : server_url + src}
        alt="Iphone"
        className={`w-full transform transition duration-1000 ease-in-out hover:opacity-75 ${isImageLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
        onClick={handleClick}
        onLoad={handleImageLoad}
      />
      {item && (
        <div className={"text-center"}>
          <p className={"text-md font-semibold"}>{item[`name`]}</p>
          <p className={"text-sm font-thin text-neutral-500"}>
            {formatNumber(item[`price`])} VND
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
