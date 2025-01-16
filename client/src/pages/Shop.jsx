import React, { useEffect, useState } from "react";
import CategoryPopup from "../components/CategoryPopup.jsx";
import ProductPagination from "../components/ProductPagination.jsx";
import ProductFilter from "../components/ProductFilter.jsx";
import ProductList from "../components/ProductList.jsx";
import { searchProductsAsync } from "../store/productSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Shop()
{
  const [query, setQuery] = useState({
    category: "",
    keyword: "",
    order: "",
    page: 1,
    limit: 9
  })
  const dispatch = useDispatch();
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      // If products are empty, fetch products from the store
      dispatch(searchProductsAsync(query));
    };
    fetchData();
  }, [query]);
  return (
    <div className={"w-full italic"}>
      <div className={"my-6 flex justify-between bg-amber-50 px-10 py-14"}>
        <h1 className={"text-3xl font-semibold"}> SHOP</h1>
        <h3 className={"font-medium text-neutral-500"}>SHOP</h3>
      </div>

      <div className={"flex space-x-2"}>
        <div className={"w-1/4"}>
          <h2
            className={
              "mb-4 text-2xl font-semibold uppercase italic text-neutral-700"
            }
          >
            Categories
          </h2>
          <div
            className={
              "bg-neutral-900 px-4 py-1 font-medium uppercase text-neutral-300"
            }
          >
            Apple
          </div>
          <>
            <CategoryPopup query={query} setQuery={setQuery} />
          </>
        </div>
        <div className={"mb-4 w-3/4"}>
          <ProductFilter query={query} setQuery={setQuery} />
          <div className={"p-4"}>
            <ProductList />
          </div>
          <ProductPagination query={query} setQuery={setQuery} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
