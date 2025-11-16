import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "../slices/fetchAllProducts";

const BACKEND_URL = "https://shop-backend-jg9e.onrender.com";

export const fetchAllProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`);
      const productsWithFullImage = res.data.map((p: Product) => ({
        ...p,
        image: `${BACKEND_URL}/images/${p.image}`,
      }));
      console.table(productsWithFullImage);
      return productsWithFullImage;
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
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
