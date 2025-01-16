import React, { useEffect, useState } from "react";
import { formatNumber } from "../utils.js";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { getOrdersById } from "../apis/orders.js";
import { server_url } from "../utils/config.js";

function HistoryDetail(props) {
  const { id } = useParams();
  const [details, setDetails] = useState({
    user: "",
    billingDetails: {
      fullName: "",
      phoneNumber: "",
      address: ""
    }
  });
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrdersById(id);
      console.log(response);
      setListItems(response[`products`]);
      setDetails(response);
    };
    fetchData();
  }, []);

  return (
    <div className={"w-full italic"}>
      <div className={"my-6 flex justify-between bg-amber-50 px-10 py-14"}>
        <h1 className={"text-3xl font-semibold"}> INFORMATION ORDER</h1>
        <h3 className={"font-medium text-neutral-500"}>INFORMATION ORDER</h3>

      </div>
      <div className={"text-lg text-neutral-500 px-8"}>
        <p>ID USER: {details.user}</p>
        <p>Full Name: {details.billingDetails.fullName}</p>
        <p>Phone: {details.billingDetails.phoneNumber}</p>
        <p>Address: {details.billingDetails.address}</p>
        <p>Total: {details.totalPrice}</p>
      </div>
      <div>
        <div className={"my-4 flex bg-gray-100 p-4"}>
          <div className={"p-4 w-full"}>
            <table className={"mb-16 w-full text-center"}>
              <thead>
              <tr className={"uppercase text-neutral-500"}>
                <th>id product</th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>count</th>
              </tr>
              </thead>
              {listItems.length > 0 && (
                <tbody>
                {listItems.map((item, index) => (
                  <tr key={index} className={"border-b-4"}>
                    <td className={"font-semibold"}>{item[`_id`]}</td>
                    <td className={"flex items-center justify-center"}>

                      <img
                        src={item[`img1`].includes("http") ? item[`img1`] : server_url + item[`img1`]}
                        alt={`product`} className={"w-24"} />
                    </td>
                    <td className={"font-semibold"}>{item[`name`]}</td>
                    <td className={"text-neutral-600"}>{formatNumber(item[`price`])} VND</td>
                    <td className={"text-neutral-600"}>{item[`quantity`]}</td>
                  </tr>
                ))}
                </tbody>
              )}
            </table>

            <div className={"flex justify-between"}>
              <div className={"space-x-2"}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <Link to="/shop">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryDetail;