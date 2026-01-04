// src/features/quotes/quoteApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setQuote,
  setQuoteStatus,
  setQuoteError,
} from "./quoteSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api", // adjust if your backend root is different
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const quoteApi = createApi({
  reducerPath: "quoteApi",
  baseQuery,
  endpoints: (builder) => ({
    generateQuote: builder.mutation({
      /*
        payload should look like:
        {
          service_type: "standard" | "urgent",
          pages: number
        }
      */
      query: (payload) => ({
        url: "/genrate-quot/",  // 👈 as you specified
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setQuoteStatus("loading"));
          const { data } = await queryFulfilled;
          // e.g. data = { amount: 1200, currency: "INR", ... }
          dispatch(setQuote(data));
          dispatch(setQuoteStatus("succeeded"));
          dispatch(setQuoteError(null));
        } catch (err) {
          console.error("Generate quote failed:", err);
          dispatch(setQuoteStatus("failed"));
          dispatch(
            setQuoteError(
              err?.data?.detail ||
                err?.data?.message ||
                err?.error ||
                "Failed to generate quote"
            )
          );
        }
      },
    }),
  }),
});

export const { useGenerateQuoteMutation } = quoteApi;
