import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = "https://shop-backend-jg9e.onrender.com";

export const postUser = createAsyncThunk(
  "posr/user",
  //I wanna post some info to users
  async (_, { rejectWithValue }, someInfo) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users`);
      return res.data;
    } catch (err) {}
  }
);
