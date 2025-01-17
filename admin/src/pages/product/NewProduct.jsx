import React, { useState } from "react";
import InputField from "../../components/form/InputField.jsx";
import { useNavigate } from "react-router-dom";
import { api } from "../../apis/index.js";
import { Bounce, toast } from "react-toastify";

const categories = ["iphone", "ipad", "macbook", "airpod", "watch", "mouse", "keyboard", "other"];

function NewProduct()
{
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    short_desc: "",
    long_desc: "",
    stock: "",
    category: "",
    images: []
  });
  console.log(formData);
  const handleImageUpload = (e) =>
  {
    const files = Array.from(e.target.files);
    console.log(files);

    if (files.length + formData.images.length > 4) {
      toast.warn("You can only upload up to 4 images", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
      return;
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  const handleRemoveImage = (index) =>
  {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleInputChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) =>
  {
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

    if (formData.images.length === 0) {
      toast.warn("Please upload at least one image", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
      return;
    }
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) =>
    {
      if (key === "images") {
        formData.images.forEach((image) =>
        {
          formDataToSend.append("images", image);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try {
      await api.products.postProduct(formDataToSend);
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
      navigate("/products");
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || (err?.response?.data?.error.message || "Failed to add product, please try again"), {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
    }
  };

  return (
    <div className="p-8 w-full">
      <h3 className="text-neutral-600 text-2xl mb-4">Add New Product</h3>
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
          <label className="font-semibold">Upload Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="border-b border-neutral-400 w-full outline-none p-2"
          />
          <p className="text-sm text-neutral-500 mt-2">
            You can upload up to 4 images. Supported formats: jpg, png, jpeg.
          </p>
          <div className="flex flex-wrap mt-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative m-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover border border-gray-300"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-6">
          <button
            type="submit"
            className="px-16 py-2 bg-cyan-700/80 hover:bg-cyan-700 text-white"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
