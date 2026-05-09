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

export const dataAnalysisApi = createApi({
  reducerPath: "dataAnalysisApi",
  baseQuery,
  tagTypes: ["DataAnalysisDetails"],
  endpoints: (builder) => ({
    // POST /orders/data-analysis/
    createDataAnalysisDetails: builder.mutation({
      query: (payload) => ({
        url: "/orders/data-analysis/",
        method: "POST",
        body: {
          order: payload.order,
          analysis_for: payload.analysis_for || "",
          title: payload.title || "",
          data_type: payload.data_type,
          analysis_objective: payload.analysis_objective,
          charts_required: payload.charts_required || "yes",
          report_format: payload.report_format || "pdf",
          additional_notes: payload.additional_notes || "",
          introduction: payload.introduction || false,
          review_of_literature: payload.review_of_literature || false,
          managing_references: payload.managing_references || false,
        },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["DataAnalysisDetails"],
    }),

    // GET /orders/data-analysis/by-order/{order_id}/
    getDataAnalysisByOrder: builder.query({
      query: (orderId) => `/orders/data-analysis/by-order/${orderId}/`,
      providesTags: (result, error, orderId) => [
        { type: "DataAnalysisDetails", id: orderId },
      ],
    }),

    // PATCH /orders/data-analysis/{id}/
    updateDataAnalysisDetails: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/orders/data-analysis/${id}/`,
        method: "PATCH",
        body: patch,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["DataAnalysisDetails"],
    }),
  }),
});

export const {
  useCreateDataAnalysisDetailsMutation,
  useGetDataAnalysisByOrderQuery,
  useUpdateDataAnalysisDetailsMutation,
} = dataAnalysisApi;
