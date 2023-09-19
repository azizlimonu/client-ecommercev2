import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './services/apiSlice';
import authSlice from "./features/authSlice";
import productModalSlice from "./features/productModalSlice";
import shopFilterSlice from "./features/shopFilterSlice";
import cartSlice from "./features/cartSlice";
import wishlistSlice from "./features/wishlistSlice";
import compareSlice from "./features/compareSlice";
import couponSlice from "./features/couponSlice";
import orderSlice from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    productModal: productModalSlice,
    shopFilter: shopFilterSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    compare: compareSlice,
    coupon: couponSlice,
    order: orderSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;