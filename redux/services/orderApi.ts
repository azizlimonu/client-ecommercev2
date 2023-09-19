import { apiSlice } from "@/redux/services/apiSlice";
import { set_client_secret } from "../features/orderSlice";

export const orderApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // create payment
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: `${process.env.BASE_API_URL}/order/create-payment-intent`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;
          dispatch(set_client_secret(result.clientSecret));
        } catch (err) {
          console.log("Error while fetch order")
        }
      },

    }),

    // saveOrder
    saveOrder: builder.mutation({
      query: (data) => ({
        url: `${process.env.BASE_API_URL}/order/saveOrder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['UserOrders'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            localStorage.removeItem("couponInfo");
            localStorage.removeItem("cart_products");
            localStorage.removeItem("shipping_info");
          }
        } catch (err) {
          console.log("ERROR WHILE SAVE ORDER");
        }
      },

    }),

    // getAllUserOrders
    getUserOrders: builder.query({
      query: () => `${process.env.BASE_API_URL}/order/user-order`,
      providesTags: ["UserOrders"],
      keepUnusedDataFor: 600,
    }),

    // getUserOrdersById
    getUserOrderById: builder.query({
      query: (id) => `${process.env.BASE_API_URL}/user-order/${id}`,
      providesTags: (result, error, arg) => [{ type: "UserOrder", id: arg }],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useSaveOrderMutation,
  useGetUserOrderByIdQuery,
  useGetUserOrdersQuery,
} = orderApi;
