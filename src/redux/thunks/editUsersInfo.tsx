import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editUsersInfo = createAsyncThunk(
  "users/editInfo",
  async (_, { rejectWithValue }) => {}
);
