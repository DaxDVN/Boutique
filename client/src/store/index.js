import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice.js";
import authSlice from "./authSlice.js";
import cartSlice from "./cartSlice.js";

const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});

export default store;
