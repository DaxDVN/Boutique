import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/statistic/Table.jsx";
import { api } from "../../apis/index.js";
import { server_url } from "../../utils/config.js";

const initialState = [
  { tag: "clients", number: 0, icon: faUser, stroke: "text-red-500 bg-red-200" },
  { tag: "earningsOfMonth", number: 0, icon: faDollarSign, stroke: "text-green-500 bg-green-200" },
  { tag: "newOrders", number: 0, icon: faShoppingCart, stroke: "text-yellow-500 bg-yellow-200" }
];

const columns = [
  { key: "_id", header: "ID User" },
  { key: "name", header: "Name" },
  { key: "phoneNumber", header: "Phone" },
  { key: "address", header: "Address" },
  { key: "totalPrice", header: "Total" },
  { key: "delivery", header: "Delivery", render: (value) => `${value}` },
  { key: "status", header: "Status" },
  // {
  //   key: "detail",
  //   header: "Detail",
  //   render: () => (
  //     <button className={`p-2 rounded-md w-fit bg-green-600 text-white`}>View</button>
  //   )
  // }
];

function Dashboard() {
  const [statistic, setStatistic] = useState([]);
  const [latestTransaction, setLatestTransaction] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
    const fetchStatistics = async () => {
      const response = await api.other.getStatistics();
      const data = initialState.map(e => {
        e.number = response[e.tag];
        return e;
      });
      setStatistic(data);
    };
    fetchStatistics();
  }, []);

  useEffect(() => {


    const fetchLatestTransactions = async () => {
      const response = await api.other.getOrders(`?page=${currentPage}&limit=${itemsPerPage}`);
      setTotalItems(response.totalCount);
      const transactions = mapData(response.result);
      setLatestTransaction(transactions);
    };
    fetchLatestTransactions();
  }, [currentPage]);
  const mapData = (apiData) => {
    return apiData.map((item) => ({
      _id: item.user._id,
      name: item.user.fullName,
      phoneNumber: item.billingDetails.phoneNumber,
      address: item.billingDetails.address,
      totalPrice: item.totalPrice,
      delivery: item.status === "PENDING" ? "Waiting for progressing" : "Done",
      status: item.status
    }));
  };
  return (
    <>
      <div className="flex p-8 gap-4">
        {statistic.map((element, index) => (
          <div key={index} className="w-1/3 p-4 shadow-lg h-36 rounded-lg hover:scale-105 ease-in-out duration-200">
            <div className="uppercase font-semibold text-neutral-400">{element.tag}</div>
            <div className="text-3xl mt-6 text-neutral-600">{element.number}</div>
            <div className="text-right">
              <FontAwesomeIcon icon={element.icon} className={`${element.stroke} p-1 rounded-md aspect-square`} />
            </div>
          </div>
        ))}
      </div>
      <div className="p-8  w-full">
        <h3 className="text-neutral-600 text-2xl mb-4">Latest Transactions</h3>
        <Table
          data={latestTransaction}
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
      </div>

    </>
  );
}

export default Dashboard;
