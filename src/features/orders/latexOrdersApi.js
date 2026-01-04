// src/features/orders/latexOrdersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addLatexOrder } from "./latexOrderSlice";
// ---- Case Conversion Helpers ----
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Convert API snake_case → camelCase
export const mapLatexOrderFromApi = (o) => ({
  id: o.id,
  orderType: o.order_type,
  serviceType: o.service_type,

  latexTitle: o.latex_details?.latex_title,
  latexType: o.latex_details?.latex_type,
  additionalNotes: o.latex_details?.additional_notes || "",
  appliedCoupon: o.latex_details?.applied_coupon || null,
  sourceFileUrl: o.latex_details?.source_file || null,

  // You can add whatever else comes from backend
  createdAt: o.created_at,
  updatedAt: o.updated_at,
});

// Convert camelCase → snake_case for API
export const mapLatexOrderToApi = (o) => ({
  order_type: "latex", // required
  service_type: o.serviceType,

  "latex_details.latex_title": o.latexTitle,
  "latex_details.latex_type": o.latexType,
  "latex_details.additional_notes": o.additionalNotes || "",

  ...(o.appliedCoupon && {
    "latex_details.applied_coupon": o.appliedCoupon,
  }),

  ...(o.sourceFile && {
    "latex_details.source_file": o.sourceFile,
  }),
});

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE + "/store", // adjust for your backend
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    // DO NOT set Content-Type here for FormData; browser will set multipart boundary
    return headers;
  },
});

export const latexOrdersApi = createApi({
  reducerPath: "latexOrdersApi",
  baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // Create a new LaTeX order
    createLatexOrder: builder.mutation({
      query: (payload) => {
        const formData = new FormData();

        // Main Order Fields
        formData.append("order_type", "latex"); // <– required
        formData.append("service_type", payload.serviceType);

        // Nested child object (latex_details)
        formData.append("latex_details.latex_title", payload.latexTitle);
        formData.append("latex_details.latex_type", payload.latexType);
        formData.append(
          "latex_details.additional_notes",
          payload.additionalNotes || ""
        );

        if (payload.appliedCoupon) {
          formData.append(
            "latex_details.applied_coupon",
            payload.appliedCoupon
          );
        }

        if (payload.sourceFile) {
          formData.append("latex_details.source_file", payload.sourceFile);
        }

        return {
          url: "/orders/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    getLatexOrders: builder.query({
      // backend should filter by order_type=latex
      query: () => "/orders/?order_type=latex",

      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              { type: "LatexOrders", id: "LIST" },
              ...result.map((o) => ({ type: "LatexOrders", id: o.id })),
            ]
          : [{ type: "LatexOrders", id: "LIST" }],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setOrdersStatus("loading"));
          const { data } = await queryFulfilled;
          // data should be an array of orders
          dispatch(setOrders(data));
          dispatch(setOrdersStatus("succeeded"));
          dispatch(setOrdersError(null));
        } catch (err) {
          console.error("Failed to load LaTeX orders:", err);
          dispatch(setOrdersStatus("failed"));
          dispatch(
            setOrdersError(
              err?.data?.detail ||
                err?.data?.message ||
                err?.error ||
                "Failed to load LaTeX orders"
            )
          );
        }
      },
    }),
  }),
});

export const { useCreateLatexOrderMutation, useGetLatexOrdersQuery } =
  latexOrdersApi;
