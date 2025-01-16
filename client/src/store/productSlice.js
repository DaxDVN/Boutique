import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, searchProducts, getProduct } from "../apis/products.js";

// Initial state for products
const initialState = {
  selectedProduct: null,
  products: [],
  filteredProducts: [],
  total: 0,
  totalPages: 0
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Show popup with selected product
    showPopup: (state, action) =>
    {
      state.selectedProduct = action.payload;
    },
    // Hide popup
    hidePopup: (state) =>
    {
      state.selectedProduct = null;
    },
    // Filter products by category
    filterProducts: (state, action) =>
    {
      if (action.payload === undefined) {
        state.filteredProducts = state.products;
        return;
      }
      // Filter products by category
      const category = action.payload;
      state.filteredProducts = state.products.filter(
        (p) => p.category === category,
      );

      // If there are no products, show all
      if (state.filteredProducts.length === 0) {
        state.filteredProducts = state.products;
      }
    },
  },
  extraReducers: (builder) =>
  {
    // Save the product list when fetched from API
    builder
      .addCase(getProductsAsync.fulfilled, (state, action) =>
      {
        state.products = action.payload.result;
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) =>
      {
        state.filteredProducts = action.payload.result
        state.total = action.payload.total
        state.totalPages = action.payload.totalPages
      })
  },
});

// Export actions and reducer
export const { showPopup, hidePopup, filterProducts } = productSlice.actions;
export default productSlice.reducer;

// Async action for getting the product list
export const getProductsAsync = createAsyncThunk("product/getProducts", async () =>
{
  return await fetchProducts();
});

export const searchProductsAsync = createAsyncThunk("product.searchProducts", async (query) =>
{

  query = new URLSearchParams(query) || "";
  return await searchProducts(query.toString())
})
