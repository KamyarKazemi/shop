import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      console.table(res.data);
      return res.data;
    } catch (err: any) {
      console.error("fetchProducts error:", err?.response?.data ?? err.message);
      return rejectWithValue(
        err?.response?.data?.error || err?.message || "unknown error"
      );
    }
  }
);

export { fetchAllProducts };
