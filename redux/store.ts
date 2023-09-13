import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './services/apiSlice';
import authSlice from "./features/authSlice";
import productModalSlice from "./features/productModalSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    productModal: productModalSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;