import Cookies from "js-cookie";
import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
const BASE_API_URL = process.env.BASE_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      try {
        const userInfo = Cookies.get('userInfo');
        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Products", "Coupon", "Product", "RelatedProducts", "UserOrder", "UserOrders", "ProductType", "OfferProducts", "PopularProducts", "TopRatedProducts"]
});
