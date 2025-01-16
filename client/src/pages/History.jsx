import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {formatNumber} from "../utils.js";
import {getOrdersByUser} from "../apis/orders.js";
import {useSelector} from "react-redux";

function History() {
  const [listOrder, setListOrder] = useState([]);
  const {currentUser} = useSelector(state => state.auth)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrdersByUser(currentUser._id)
      setListOrder(response)
    }
    fetchData();
  }, [])

  return (
    <div className={"w-full italic"}>
      <div className={"my-6 flex justify-between bg-amber-50 px-10 py-14"}>
        <h1 className={"text-3xl font-semibold"}> HISTORY</h1>
        <h3 className={"font-medium text-neutral-500"}>HISTORY</h3>
      </div>
      <div>
        <div className={"my-4 flex bg-gray-100 p-4"}>
          <div className={"p-4"}>
            <table className={"mb-16 w-full text-center"}>
              <thead>
              <tr className={"uppercase text-neutral-500"}>
                <th>id order</th>
                <th>id user</th>
                <th>name</th>
                <th>phone</th>
                <th>address</th>
                <th>total</th>
                <th>delivery</th>
                <th>status</th>
                <th>detail</th>
              </tr>
              </thead>
              {listOrder.length > 0 && (
                <tbody>
                {listOrder.map((item, index) => (
                  <tr key={index} className={"border-b-4"}>
                    <td className={"text-neutral-600 px-2"}>{currentUser[`_id`]}</td>
                    <td className={"text-neutral-600 px-2"}>{item[`user`]}</td>
                    <td className={"text-neutral-600 px-2"}>{item[`billingDetails`][`fullName`]}</td>
                    <td className={"text-neutral-600 px-2"}>{item[`billingDetails`][`phoneNumber`]}</td>
                    <td className={"text-neutral-600 px-2"}>{item[`billingDetails`][`address`]}</td>
                    <td className={"text-neutral-600 px-2"}>
                      {formatNumber(item[`totalPrice`])} VND
                    </td>
                    <td
                      className={"text-neutral-600 px-2"}>{item[`status`] === "PENDING" ? "Waiting for progressing" : "Done"}</td>
                    <td className={"text-neutral-600 px-2"}>{item[`status`]}</td>
                    <td>
                      <div>
                        <Link to={"/history/" + item[`_id`]}
                              className={`w-fit space-x-2 border-2 p-2 text-neutral-700 duration-300 ease-in-out hover:bg-neutral-700 hover:text-white  border-neutral-800 flex justify-center items-center`}>
                          <span>View</span>
                          <FontAwesomeIcon icon={faArrowRightLong}/>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              )}
            </table>

            <div className={"flex justify-between"}>
              <div className={"space-x-2"}>
                <FontAwesomeIcon icon={faArrowLeftLong}/>
                <Link to="/shop">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;