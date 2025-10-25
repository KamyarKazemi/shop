import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../thunks/fetchAllProducts";

interface Product {
  id: number;
  title: string;
  caption: string;
  price: string;
  details: string;
  image: string;
  stock: number;
  comments: { user: string; text: string; rating: number }[];
}

interface ProductsState {
  products: Product[] | null;
  productsStatus: "idle" | "loading" | "success" | "failed";
  productsError: null | string;
}

const initialState: ProductsState = {
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
        state.products = action.payload as Product[];
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError =
          (action.payload as string) || "something went wrong";
      });
  },
});

export default fetchAllProductsSlice.reducer;
export type { Product };
