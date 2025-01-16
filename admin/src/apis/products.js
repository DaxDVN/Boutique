import axios from "./axios.js";

export const getProducts = async (query = "") => {
  const response = await axios.get(`/api/products${query}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data.result;
};

export const postProduct = async (body) => {
  return await axios.post(`/api/products`, body);
};

export const putProduct = async (id, body) => {
  return await axios.put(`/api/products/${id}`, body);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`/api/products/${id}`);
};