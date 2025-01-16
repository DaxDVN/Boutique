import React, { useEffect, useState } from "react";

const withTableData = (WrappedComponent, fetchDataFn, columns) => {
  return function TableContainer() {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const itemsPerPage = 7;

    const handlePrev = () =>
      currentPage > 1 && setCurrentPage((prev) => prev - 1);

    const handleNext = () =>
      currentPage < Math.ceil(totalItems / itemsPerPage) &&
      setCurrentPage((prev) => prev + 1);

    const handleSelectAll = (e) => {
      const allIdsOnPage = data.map((item) => item._id);
      setSelectedRows(
        e.target.checked
          ? [...new Set([...selectedRows, ...allIdsOnPage])]
          : selectedRows.filter((id) => !allIdsOnPage.includes(id))
      );
    };

    const handleSelectRow = (id) =>
      setSelectedRows((prev) =>
        prev.includes(id)
          ? prev.filter((rowId) => rowId !== id)
          : [...prev, id]
      );

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetchDataFn(`?page=${currentPage}&limit=${itemsPerPage}`);
        const { result, totalCount } = response;
        setData(result.map(
          (item) => ({
            action: item?.isAdmin === undefined
              ? {
                action: ["Edit", "Delete"],
                id: item._id
              }
              : (item.isAdmin ? {
                action: "Deactivate",
                id: item._id
              } : {
                action: "Activate",
                id: item._id
              }),
            ...item
          })));
        setTotalItems(totalCount);
      };
      fetchData();
    }, [currentPage]);

    return (
      <WrappedComponent
        data={data}
        columns={columns}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        selectedRows={selectedRows}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        onPrev={handlePrev}
        onNext={handleNext}
        totalItems={totalItems}
      />
    );
  };
};
export default withTableData;
