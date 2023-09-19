import { apiSlice } from "@/redux/services/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOfferCoupons: builder.query({
      query: () => `${process.env.BASE_API_URL}/coupon`,
      providesTags: ['Coupon'],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetOfferCouponsQuery } = authApi;
