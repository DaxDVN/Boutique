import axios from "./axios";

export const checkout = async (id, billingDetails) =>
{
  try {
    return await axios.post(`/orders/${id}/checkout`, {
      billingDetails: billingDetails
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getOrdersByUser = async (id) => {
  try {
    return await axios.get(`/orders/${id}/orders`);
  }catch(err) {
    throw err;
  }
}

export const getOrdersById = async (id) => {
  try {
    return await axios.get(`/orders/${id}`);
  }catch(err) {
    throw err;
  }
}