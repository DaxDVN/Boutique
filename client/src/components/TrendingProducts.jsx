import React, { Suspense, useEffect } from "react";
import ProductItem from "./ProductItem.jsx";
import ProductDetail from "./ProductDetail.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "../store/productSlice.js";

function TrendingProducts()
{
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { selectedProduct } = useSelector((state) => state.product);

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      dispatch(getProductsAsync());
    };
    // If products are empty, fetch products from the store
    if (products.length === 0) {
      fetchData().then();
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {products.length > 0 && (
        <div className={"italic"}>
          <h3 className={"text-md uppercase text-neutral-400"}>
            Made the hard way
          </h3>
          <h2 className={"text-2xl font-semibold uppercase text-neutral-700"}>
            Top trending products
          </h2>
          <div className={"grid grid-cols-4 gap-x-8 gap-y-4"}>
            {products.slice(0, 8).map((product, index) => (
              <ProductItem
                src={product[`img1`]}
                style={"col-span-1"}
                item={product}
                key={index}
              />
            ))}
          </div>
          {selectedProduct && <ProductDetail />}
        </div>
      )}
    </Suspense>
  );
}

export default TrendingProducts;
