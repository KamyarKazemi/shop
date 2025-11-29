import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface UserInfo {
  username: string;
  password: string;
  email: string;
}

const postUser = createAsyncThunk(
  "posr/user",
  //I wanna post some info to users
  async (userInfo: UserInfo, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users`, userInfo);
      console.table("user created: ", res.data);
      return res.data;
    } catch (err) {
      console.error("post user failed: ", err?.response?.data ?? err?.message);
      return rejectWithValue(
        err?.response?.data?.error || err?.message || "unknown error"
      );
    }
  }
);

export { postUser };
