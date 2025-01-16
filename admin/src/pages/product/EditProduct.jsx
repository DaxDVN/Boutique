import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../apis/index.js";
import { Bounce, toast } from "react-toastify";
import InputField from "../../components/form/InputField.jsx";

const categories = ["iphone", "ipad", "macbook", "airpod", "watch", "mouse", "keyboard", "other"];

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    short_desc: "",
    long_desc: "",
    stock: "",
    category: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.products.getProductById(id);
        setFormData({
          name: response.name,
          price: response.price,
          short_desc: response.short_desc,
          long_desc: response.long_desc,
          stock: response.stock,
          category: response.category
        });
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "Failed to fetch product details", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored"
        });
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const value of Object.values(formData)) {
      if (typeof value === "string" && value === "") {
        toast.warn("Please enter all fields", {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
          transition: Bounce
        });
        return;
      }
    }

    try {
      await api.products.putProduct(id, formData);
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
      navigate(`/products`);
    } catch (err) {
      toast.error("Failed to update product, please try again", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
    }
  };

  return (
    <div className="p-8 w-full">
      <h3 className="text-neutral-600 text-2xl mb-4">Edit Product</h3>
      <form className="flex flex-wrap justify-between px-12" onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <div className="w-2/5 mt-6">
          <label htmlFor="category" className="font-semibold">Choose a category</label>
          <br />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border-b border-neutral-400 w-full outline-none p-2"
          >
            <option value={""}>Select category</option>
            {categories.map(c => (
              <option value={c} key={c}>{c}</option>
            ))}
          </select>
        </div>

        <InputField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          type="number"
        />
        <InputField
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          type="number"
        />
        <InputField
          label="Short Description"
          name="short_desc"
          value={formData.short_desc}
          onChange={handleInputChange}
          placeholder="Short Description"
          type="textarea"
        />
        <InputField
          label="Long Description"
          name="long_desc"
          value={formData.long_desc}
          onChange={handleInputChange}
          placeholder="Long Description"
          type="textarea"
        />

        <div className="w-full mt-6">
          <button
            type="submit"
            className="px-16 py-2 bg-cyan-700/80 hover:bg-cyan-700 text-white"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
