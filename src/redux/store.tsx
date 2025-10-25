import { configureStore } from "@reduxjs/toolkit";
import fetchAllProductsReducer from "./slices/fetchAllProducts";

const store = configureStore({
  reducer: {
    fetchAllProductsState: fetchAllProductsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
