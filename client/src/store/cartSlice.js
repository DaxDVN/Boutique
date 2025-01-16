import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {saveCart} from "../apis/users.js";
import {Bounce, toast} from "react-toastify";
import {checkout} from "../apis/orders.js";
// Initial state for cart
const initialState = {
  listCart: JSON.parse(sessionStorage.getItem("cart")) || [],
  totalPrice: 0,
  toastId: null
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addCart: (state, action) => {
      const item = action.payload;
      const i = state.listCart.findIndex(
        (cartItem) => cartItem[`_id`] === item[`_id`],
      );
      if (i === -1) {
        state.listCart.push(item);
      } else {
        state.listCart[i].quantity += item.quantity;
      }
      sessionStorage.setItem("cart", JSON.stringify(state.listCart));
    },
    // Update cart (number product quantity)
    updateCart: (state, action) => {
      const item = action.payload;
      const i = state.listCart.findIndex(
        (cartItem) => cartItem[`_id`] === item[`_id`],
      );
      if (i !== -1) {
        state.listCart[i].quantity = item.quantity;
      }
      sessionStorage.setItem("cart", JSON.stringify(state.listCart));
    },
    // Remove item from cart
    removeCart: (state, action) => {
      const item = action.payload;
      const listCart = state.listCart.filter(
        (cartItem) => cartItem[`_id`] !== item[`_id`],
      );
      state.listCart = listCart;
      sessionStorage.setItem("cart", JSON.stringify(state.listCart));
    },
    // Calculate total cart value
    calculateTotal: (state, action) => {
      state.totalPrice = state.listCart.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCartAsync.fulfilled, (state, action) => {
        toast.success("Save cart successfully!", {
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
      .addCase(saveCartAsync.rejected, (state, action) => {
        toast.error("Failed to save cart!", {
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
      .addCase(checkoutAsync.pending, (state, action) => {
        const toastInfo = toast.info("Ordering, please wait a second!", {
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
        state.toastId = JSON.stringify(toastInfo)
      })
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        state.toastId = null;
        state.listCart = []
        state.totalPrice = 0
        sessionStorage.setItem("cart", JSON.stringify(state.listCart));
        toast.success("Order successfully!", {
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
      .addCase(checkoutAsync.rejected, (state, action) => {
        const toastInfo = JSON.parse(state.toastId);
        toast.dismiss(state.toastId);
        state.toastId = null;
        toast.error("Order failed, please try again", {
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
  }
});

// Export actions and reducer
export const {addCart, updateCart, removeCart, calculateTotal} =
  cartSlice.actions;
export default cartSlice.reducer;

export const saveCartAsync = createAsyncThunk("cart/saveCart", async (id, {getState}) => {
  const state = getState();
  const cart = state.cart.listCart;
  return await saveCart(id, cart)
})

export const checkoutAsync = createAsyncThunk("cart/checkout", async ({id, billingDetails}) => {
  return await checkout(id, billingDetails)
})