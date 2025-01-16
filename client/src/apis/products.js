import axios from "./axios";

export const fetchProducts = async () =>
{
  try {
    return await axios.get("/products");
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const searchProducts = async (query) =>
{
  try {
    return await axios.get(`/products/pagination?${query}`)
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const getProduct = async (id) =>
{
  try {
    return await axios.get(`/products/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}