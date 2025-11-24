import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../thunks/fetchAllProducts";

const initialState = {
  products: null,
  productsStatus: "idle",
  productsError: null,
};

const fetchAllProductsSlice = createSlice({
  name: "fetchAllProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.productsStatus = "loading";
        state.productsError = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.productsStatus = "success";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.payload || "something went wrong";
      });
  },
});

export default fetchAllProductsSlice.reducer;
