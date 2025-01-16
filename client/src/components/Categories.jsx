import React from "react";
import Iphone from "../assets/product_1.png";
import Mac from "../assets/product_2.png";
import IPad from "../assets/product_3.png";
import Watch from "../assets/product_4.png";
import AirPods from "../assets/product_5.png";
import ProductItem from "./ProductItem.jsx";

function Categories(props) {
  return (
    <div className={"flex flex-col items-center italic"}>
      <h3 className={"text-md uppercase text-neutral-400"}>
        Carefully Created Collections
      </h3>
      <h2 className={"text-2xl font-semibold uppercase text-neutral-700"}>
        Browse our categories
      </h2>
      <div className="mt-6 grid grid-cols-6 gap-4">
        <ProductItem src={Iphone} style={"col-span-3"} />
        <ProductItem src={Mac} style={"col-span-3"} />
        <ProductItem src={IPad} style={"col-span-2"} />
        <ProductItem src={Watch} style={"col-span-2"} />
        <ProductItem src={AirPods} style={"col-span-2"} />
      </div>
    </div>
  );
}

export default Categories;
