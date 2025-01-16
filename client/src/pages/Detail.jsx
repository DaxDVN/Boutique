import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInformation from "../components/ProductInformation.jsx";
import ProductItem from "../components/ProductItem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { getProduct } from "../apis/products.js";
import { server_url } from "../utils/config.js";

function Detail()
{
  const { productId } = useParams();
  const [product, setProduct] = useState()
  // State to control the popup visibility
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const response = await getProduct(productId);
      console.log(response);

      setProduct(response.result)
    };
    fetchData();
  }, []);

  // Split description by bullet points or dashes and format it
  const formatLongDesc = (description) =>
  {
    const parts = description.split(/(?:•|-)/).map((part) => part.trim());

    return (
      <div className="text-neutral-500">
        <div className="mb-2 text-lg font-semibold uppercase">{parts[0]}</div>
        <ul className="list-disc space-y-2 pl-6">
          {parts.slice(1).map((part, index) => (
            <li key={index}>{part}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Toggle the popup visibility
  const togglePoup = () =>
  {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className={"mt-10 italic"}>
      {product && (
        <>
          <div className={"flex w-full p-10"}>
            <div className={"flex h-1/2 w-1/2"}>
              <div className={"grid h-full grid-cols-4 grid-rows-4"}>
                <img
                  src={product[`img4`].includes("http") ? product[`img4`] : server_url + product[`img4`]}
                  alt="product"
                  className={"row-start-1 max-h-full w-full object-contain"}
                />
                <img
                  src={product[`img3`].includes("http") ? product[`img3`] : server_url + product[`img3`]}

                  alt="product"
                  className={"row-start-2 max-h-full w-full object-contain"}
                />
                <img
                  src={product[`img2`].includes("http") ? product[`img2`] : server_url + product[`img2`]}
                  alt="product"
                  className={"row-start-3 max-h-full w-full object-contain"}
                />
                <img
                  src={product[`img1`].includes("http") ? product[`img1`] : server_url + product[`img1`]}
                  alt="product"
                  className={"row-start-4 max-h-full w-full object-contain"}
                />
                <img
                  src={product[`img1`].includes("http") ? product[`img1`] : server_url + product[`img1`]}
                  alt="product"
                  className={
                    "col-span-3 row-span-4 h-full max-h-full object-cover object-center"
                  }
                />
              </div>
            </div>
            <ProductInformation product={product} togglePoup={togglePoup} />
          </div>
          <div className={"space-y-6 py-10"}>
            <div
              className={
                "w-fit bg-neutral-700 px-4 py-2 uppercase text-neutral-100"
              }
            >
              Description
            </div>
            <h2 className={"text-xl font-medium uppercase"}>
              Product description
            </h2>
            <div className={"text-neutral-500"}>
              <div>{formatLongDesc(product[`long_desc`])}</div>
            </div>
          </div>
          <div className={"mb-6"}>
            <h2 className={"text-xl font-medium uppercase"}>
              Related products
            </h2>
            <div className={"grid grid-cols-4"}>
              {product.relationProduct.map((item, index) => (
                <ProductItem
                  item={item}
                  key={index}
                  src={item[`img1`]}
                  style={"col-span-1"}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {/* Popup message after adding to cart */}
      {isPopupOpen && (
        <div
          className={
            "fixed inset-0 z-30 flex items-center justify-center text-black"
          }
        >
          <div
            className={"absolute inset-0 bg-black/30"}
            onClick={() => togglePoup()}
          ></div>
          <div className="relative w-72 rounded-lg bg-white p-4 text-center shadow-lg">
            <button
              className={"absolute right-2 top-1"}
              onClick={() => togglePoup()}
            >
              <FontAwesomeIcon icon={faClose} className={"cursor-pointer"} />
            </button>
            <h3 className="mb-6 text-lg font-bold text-green-600">
              Add to cart successfully!
            </h3>
            <div className="mt-2 scale-150 text-gray-600">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={"scale-150 text-green-600"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Detail);
