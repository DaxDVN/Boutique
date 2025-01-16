import axios from "./axios";

export const login = async (body) =>
{
  try {
    const response = await axios.post("/auth/login", body);
    return response;
  } catch (error) {
    const errorMessage = error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.message
    throw new Error(errorMessage || "Can not login")
  }
};


export const register = async (body) =>
{
  try {
    const response = await axios.post("/auth/register", body)
    return response
  } catch (error) {
    const errorMessage = error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.message
    throw new Error(errorMessage || "Can not register")
  }
}