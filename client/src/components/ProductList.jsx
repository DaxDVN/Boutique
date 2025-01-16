import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem.jsx";

function ProductList(props) {
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.product);
  return (
    <div className={"grid grid-cols-3 gap-2"}>
      {filteredProducts &&
        filteredProducts.length > 0 &&
        filteredProducts.map((product, index) => (
          <ProductItem
            item={product}
            key={index}
            src={product[`img1`]}
            style={"col-span-1"}
          />
        ))}
    </div>
  );
}

export default ProductList;
