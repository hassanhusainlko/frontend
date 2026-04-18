import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const latexOrdersApi = createApi({
  reducerPath: "latexOrdersApi",
  baseQuery,
  tagTypes: ["LatexDetails"],
  endpoints: (builder) => ({
    // POST /orders/latex/
    createLatexDetails: builder.mutation({
      query: (payload) => ({
        url: "/orders/latex/",
        method: "POST",
        body: {
          order: payload.order,
          conversion_type: payload.conversion_type,
          estimated_pages: payload.estimated_pages,
          journal_template: payload.journal_template || "",
          bibliography_style: payload.bibliography_style || "apa",
          figures_tables_count: payload.figures_tables_count || 0,
          special_instructions: payload.special_instructions || "",
        },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["LatexDetails"],
    }),

    // GET /orders/latex/by-order/{order_id}/
    getLatexByOrder: builder.query({
      query: (orderId) => `/orders/latex/by-order/${orderId}/`,
      providesTags: (result, error, orderId) => [
        { type: "LatexDetails", id: orderId },
      ],
    }),

    // PATCH /orders/latex/{id}/
    updateLatexDetails: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/orders/latex/${id}/`,
        method: "PATCH",
        body: patch,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["LatexDetails"],
    }),
  }),
});

export const {
  useCreateLatexDetailsMutation,
  useGetLatexByOrderQuery,
  useUpdateLatexDetailsMutation,
} = latexOrdersApi;
