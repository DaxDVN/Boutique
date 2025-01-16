import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login, register} from "../apis/auth.js";
import {Bounce, toast} from "react-toastify";

const initialState = {
  isLogin: JSON.parse(sessionStorage.getItem("isLogin")) || false,
  loading: false,
  currentUser: JSON.parse(sessionStorage.getItem("currentUser")) || null,
  token: sessionStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogout: (state) =>
    {
      state.isLogin = false;
      state.currentUser = null;
      state.token = null;
      sessionStorage.removeItem("isLogin");
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(loginAsync.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) =>
      {
        const { result, message } = action.payload;
        console.log(result)
        state.loading = false;
        state.isLogin = true;
        state.currentUser = result
        sessionStorage.setItem("isLogin", JSON.stringify(true));
        sessionStorage.setItem("currentUser", JSON.stringify({
          ...result
        }));
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("cart", JSON.stringify(result.cart));
        toast.success(message, {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
          transition: Bounce,
        });
      })
      .addCase(loginAsync.rejected, (state, action) =>
      {
        state.loading = false;
        console.log(action);

        toast.error(action.error.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      })
      .addCase(registerAsync.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) =>
      {
        state.loading = false;
        toast.success("Register Successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      })
      .addCase(registerAsync.rejected, (state, action) =>
      {
        state.loading = false;
        toast.error(action.error.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      })
  },
});

export const { onLogout } = authSlice.actions;
export default authSlice.reducer;

// Async actions
export const loginAsync = createAsyncThunk("auth/login", async (body) =>
{
  return await login(body);
});

export const registerAsync = createAsyncThunk("auth/register", async (body) =>
{
  const response = await register(body);
  return response.data;
});