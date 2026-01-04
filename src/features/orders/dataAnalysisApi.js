import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDataAnalysisOrder,
  setDataAnalysisStatus,
  setDataAnalysisError,
  resetDataAnalysisForm,
} from "./dataAnalysisSlice";
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE + "/store", // adjust to your backend root, e.g. "/api"
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    // Don't set Content-Type here for FormData; browser will set boundary
    return headers;
  },
});

export const dataAnalysisApi = createApi({
  reducerPath: "dataAnalysisApi",
  baseQuery,
  tagTypes: ["DataAnalysisOrders"],
  endpoints: (builder) => ({
    // POST /api/orders/  → creates an Order + DataAnalysisOrder child
    createDataAnalysisOrder: builder.mutation({
      query: (payload) => {
        const formData = new FormData();

        // Base Order fields
        formData.append("order_type", "data_analysis"); // maps to Order.order_type
        formData.append("service_type", payload.serviceType); // maps to Order.service_type

        // Nested DataAnalysisOrder fields
        if (payload.dataTitle) {
          formData.append("data_details.data_title", payload.dataTitle);
        }
        if (payload.dataObjective) {
          formData.append("data_details.data_objective", payload.dataObjective);
        }
        if (payload.dataType) {
          formData.append("data_details.data_type", payload.dataType);
        }
        if (payload.additionalNotes) {
          formData.append(
            "data_details.additional_notes",
            payload.additionalNotes
          );
        }
        if (payload.appliedCoupon) {
          formData.append("data_details.applied_coupon", payload.appliedCoupon);
        }

        // Files
        if (payload.mainDocument) {
          formData.append("data_details.main_document", payload.mainDocument);
        }
        if (payload.supportingDocument) {
          formData.append(
            "data_details.supporting_document",
            payload.supportingDocument
          );
        }

        return {
          url: "/orders/",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["DataAnalysisOrders"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setDataAnalysisStatus("loading"));
          const { data } = await queryFulfilled;

          // data = newly created Order (with nested data_details, depending on your serializer)
          dispatch(addDataAnalysisOrder(data));
          dispatch(setDataAnalysisStatus("succeeded"));
          dispatch(setDataAnalysisError(null));
          dispatch(resetDataAnalysisForm());
        } catch (err) {
          console.error("Failed to create data analysis order:", err);
          dispatch(setDataAnalysisStatus("failed"));
          dispatch(
            setDataAnalysisError(
              err?.data?.detail ||
                err?.data?.message ||
                err?.error ||
                "Failed to create data analysis order"
            )
          );
        }
      },
    }),
  }),
});

export const { useCreateDataAnalysisOrderMutation } = dataAnalysisApi;
