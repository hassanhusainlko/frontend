import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery,
  endpoints: (builder) => ({
    // POST /payments/create/{order_id}/
    // payment_type: "token" | "final"
    // Returns: { payment_session_id, order_id }
    createPayment: builder.mutation({
      query: ({ orderId, payment_type }) => ({
        url: `/payments/create/${orderId}/`,
        method: "POST",
        body: { payment_type },
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentsApi;
