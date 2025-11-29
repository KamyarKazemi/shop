import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      const productsWithFullImage = res.data.map((p) => ({
        ...p,
        image: `${BASE_URL}/images/${p.image}`,
      }));
      console.table(productsWithFullImage);
      return productsWithFullImage;
    } catch (err) {
      const error = err;
      console.error(
        "fetchProducts error:",
        error?.response?.data ?? error?.message
      );
      return rejectWithValue(
        error?.response?.data?.error || error?.message || "unknown error"
      );
    }
  }
);
