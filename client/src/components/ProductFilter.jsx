import React, { useEffect, useState } from "react";

function ProductFilter({ query, setQuery })
{
  const handleChange = (e) =>
  {
    setQuery({
      ...query,
      keyword: e.target.value
    })
  }

  return (
    <div className={"flex justify-between px-4"}>
      <input
        type="text"
        placeholder={"Enter Search Here"}
        className={
          "w-1/4 rounded-sm border-2 border-neutral-300 p-2 outline-none"
        }
        value={query.keyword}
        onChange={handleChange}
      />
      {/* <select className={"w-1/4 rounded-sm border-2 border-neutral-500 px-1"}>
        <option value="">Default sorting</option>
      </select> */}
    </div>
  );
}

export default ProductFilter;
