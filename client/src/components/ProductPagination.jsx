import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { useSelector } from "react-redux";

function ProductPagination({ query, setQuery })
{
  const { totalPages } = useSelector((state) => state.product);
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  const handleSelectPage = (number) =>
  {
    setQuery({
      ...query,
      page: number
    })
  }

  return (
    <div className={"flex justify-end"}>
      {totalPages > 0 && (
        <>
          <div
            className={
              "flex aspect-square w-8 cursor-pointer items-center justify-center border-2 border-neutral-300/30 bg-neutral-200 hover:bg-neutral-300"
            }
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          {pageNumbers.map((number) => (
            <div
              key={number}
              className={
                `flex aspect-square w-8 cursor-pointer items-center justify-center border-2 border-neutral-300/30 ${query.page === number ? "bg-neutral-900 text-neutral-300" : "bg-neutral-200"}`
              }
              onClick={() => handleSelectPage(number)}
            >
              {number}
            </div>
          ))}
          <div
            className={
              "flex aspect-square w-8 cursor-pointer items-center justify-center border-2 border-neutral-300/30 bg-neutral-200 hover:bg-neutral-300"
            }
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPagination;
