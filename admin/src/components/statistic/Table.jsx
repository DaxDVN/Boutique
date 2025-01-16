import React from "react";

const Table = ({
                 data,
                 columns,
                 currentPage,
                 itemsPerPage,
                 selectedRows,
                 onSelectAll,
                 onSelectRow,
                 onPrev,
                 onNext,
                 totalItems
               }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <>
      <table className="w-full text-left border">
        {/* Table header */}
        <thead>
        <tr className="border-b">
          <th className="text-neutral-600 p-4">
            <input type="checkbox" onChange={onSelectAll} />
          </th>
          {columns.map((col, idx) => (
            <th key={idx} className="text-neutral-600 p-4">
              <span className="text-neutral-300">| </span>
              {col.header}
            </th>
          ))}
        </tr>
        </thead>
        {/* Table body */}
        <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-b">
            <td className="p-4">
              <input
                type="checkbox"
                checked={selectedRows.includes(item._id)}
                onChange={() => onSelectRow(item._id)}
              />
            </td>
            {columns.map((col, colIdx) => (
              <td key={colIdx} className="p-4">
                {col.render ? col.render(item[col.key]) : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {itemsPerPage * (currentPage - 1) + 1}–{Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded-lg text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              &lt; Prev
            </button>
            <button
              onClick={onNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded-lg text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export default Table;
