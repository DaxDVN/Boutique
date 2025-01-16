import axios from "./axios";

export const saveCart = async (id, cart) =>
{
  try {
    return await axios.put(`/users/${id}/cart`, {
      cart: cart
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUser = async (id) =>
{
  try {
    return await axios.get(`/users/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}