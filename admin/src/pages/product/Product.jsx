import React from "react";
import Table from "../../components/statistic/Table.jsx";
import { api } from "../../apis/index.js";
import withTableData from "../../hoc/withTableData.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { server_url } from "../../utils/config.js";

const columns = [
  { key: "_id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "price", header: "Price", render: (value) => {
    return (<>{formatNumber(value)}</>)
    } },
  { key: "img1", header: "Price", render: (value) => (
      <img src={value.includes("http") ? value : server_url + value} alt="" className={"w-20"}/>
    ) },
  { key: "category", header: "Category" },
  {
    key: "action",
    header: "Edit",
    render: (value) => (
      <div className={"gap-2 flex"}>
        <Link to={"/product-edit/" + value.id}
              className={`p-2 rounded-md w-fit border border-yellow-600 border-dashed text-yellow-600 hover:text-white hover:bg-yellow-600`}
        >
          {value.action[0]}
        </Link>
        <button
          className={`p-2 rounded-md w-fit border border-red-600 border-dashed text-red-600 hover:text-white hover:bg-red-600`}
          onClick={() => {
            const confirm = window.confirm("Are you sure to delete this product?");
            if (confirm) {
              api.products.deleteProduct(value.id).then(() => {
                document.location.reload();
              }).catch(error => {
                console.log(error);
                toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce
                });
              });
            }
          }}
        >
          {value.action[1]}
        </button>
      </div>
    )
  }
];

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function Product(props) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="absolute right-8 top-24 py-2 px-4 text-green-500 border-green-500 border rounded-lg hover:bg-green-500 hover:text-white ease-in-out duration-200"
        onClick={() => navigate("/product-new")}
      >
        Add New
      </button>
      <div className="p-8 w-full">
        <h3 className="text-neutral-600 text-2xl mb-4">Product List</h3>
        <Table {...props} />
      </div>
    </div>
  );
}

export default withTableData(Product, api.products.getProducts, columns);

