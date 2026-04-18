import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const quoteApi = createApi({
  reducerPath: "quoteApi",
  baseQuery,
  tagTypes: ["Quotes"],
  endpoints: (builder) => ({
    // Step 1 — POST /quotes/request-quote/
    requestQuote: builder.mutation({
      query: (payload) => ({
        url: "/quotes/request-quote/",
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Quotes"],
    }),

    // Step 2 — POST /quotes/{id}/upload-file/ (multipart)
    uploadQuoteFile: builder.mutation({
      query: ({ quoteId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/quotes/${quoteId}/upload-file/`,
          method: "POST",
          body: formData,
        };
      },
    }),

    // Step 3 — POST /quotes/{id}/accept/ → returns { order_id }
    acceptQuote: builder.mutation({
      query: (quoteId) => ({
        url: `/quotes/${quoteId}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["Quotes"],
    }),
  }),
});

export const {
  useRequestQuoteMutation,
  useUploadQuoteFileMutation,
  useAcceptQuoteMutation,
} = quoteApi;
