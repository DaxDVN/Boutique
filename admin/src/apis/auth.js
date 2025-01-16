import axios from "./axios.js";

export const login = async (request) => {
  try {
    const response = await axios.post(`/api/auth/login`, request);

    return response.data;
  } catch (err) {
    const messages =
      err.response?.data?.message
        ? [err.response.data.message]
        : (err.response.data.errors || [err.message]);
    return {
      success: false, messages: messages
    };
  }
};

export const register = async (request) => {
  try {
    await axios.put(`/register`, request);
    return {
      success: true, messages: ["Register Successfully"]
    };
  } catch (err) {
    const messages =
      err.response?.data?.message
        ? [err.response.data.message]
        : (err.response.data.errors || [err.message]);

    return {
      success: false, messages: messages
    };
  }
};