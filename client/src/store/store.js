import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import apiReducer from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
  },
});

export default store;
