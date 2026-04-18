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

export const couponsApi = createApi({
  reducerPath: "couponsApi",
  baseQuery,
  tagTypes: ["Coupons"],
  endpoints: (builder) => ({
    // POST /coupons/validate/
    validateCoupon: builder.mutation({
      query: ({ code, order_amount }) => ({
        url: "/coupons/validate/",
        method: "POST",
        body: { code, order_amount },
      }),
    }),

    // GET /coupons/my-coupons/
    getMyCoupons: builder.query({
      query: () => "/coupons/my-coupons/",
      providesTags: ["Coupons"],
    }),
  }),
});

export const { useValidateCouponMutation, useGetMyCouponsQuery } = couponsApi;
