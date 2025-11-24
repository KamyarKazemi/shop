import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = "https://shop-backend-jg9e.onrender.com";

export const postUser = createAsyncThunk(
  "posr/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users`);
      return res.data;
    } catch (err) {}
  }
);
