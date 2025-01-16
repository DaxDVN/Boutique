import axios from "./axios.js";

export const getStatistics = async () => {
  const response = await axios.get(`/api/statistic`);
  return response.data.result;
};

export const getOrders = async (query) => {
  const response = await axios.get(`/api/orders${query}`);
  return response.data;
};

export const getChatRooms = async (query) => {
  const response = await axios.get(`/api/chat`);
  return response.data;
}