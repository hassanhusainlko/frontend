import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setOrders,
  setOrdersStatus,
  setOrdersError,
  addOrder,
  updateOrder,
} from "./orderSlice";
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/";
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE + "/store", // adjust to your backend root if needed
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // ---------- GET list of orders ----------
    /**
     * orderType:
     *  - "all" or undefined → /orders/
     *  - "latex" → /orders/?order_type=latex
     *  - "data_analysis" → /orders/?order_type=data_analysis
     */
    getOrders: builder.query({
      query: () => {
        console.log("API_BASE:", API_BASE);
        return "/orders";
      },
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              { type: "Orders", id: "LIST" },
              ...result.map((o) => ({ type: "Orders", id: o.id })),
            ]
          : [{ type: "Orders", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setOrdersStatus("loading"));
          const { data } = await queryFulfilled;
          dispatch(setOrders(data || []));
          dispatch(setOrdersStatus("succeeded"));
          dispatch(setOrdersError(null));
        } catch (err) {
          console.error("Failed to load orders:", err);
          dispatch(setOrdersStatus("failed"));
          dispatch(
            setOrdersError(
              err?.data?.detail ||
                err?.data?.message ||
                err?.error ||
                "Failed to load orders"
            )
          );
        }
      },
    }),

    // ---------- GET single order by id ----------
    getOrder: builder.query({
      query: (id) => `/orders/${id}/`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(`This is order: ${data}`);
          // keep slice in sync too (optional)
          dispatch(updateOrder(data));
        } catch (err) {
          console.error("Failed to load order:", err);
        }
      },
    }),

    // ---------- CREATE LaTeX Order ----------
    createLatexOrder: builder.mutation({
      /*
        payload:
        {
          serviceType: "standard" | "urgent",
          latexType: "pdf_to_latex" | "word_to_latex" | "editable_pdf_to_latex",
          sourceFile: File,
          additionalNotes: string,
        }
        (you can add coupon or more fields later)
      */
      query: (payload) => {
        const formData = new FormData();

        // Base order fields
        formData.append("order_type", "latex");
        if (payload.serviceType) {
          formData.append("service_type", payload.serviceType);
        }

        // Nested latex_details fields
        if (payload.latexType) {
          formData.append("latex_details.latex_type", payload.latexType);
        }
        if (payload.additionalNotes) {
          formData.append(
            "latex_details.additional_notes",
            payload.additionalNotes
          );
        }
        if (payload.sourceFile) {
          formData.append("latex_details.source_file", payload.sourceFile);
        }
        if (payload.appliedCoupon) {
          formData.append(
            "latex_details.applied_coupon",
            payload.appliedCoupon
          );
        }

        return {
          url: "/orders/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addOrder(data));
        } catch (err) {
          console.error("Failed to create LaTeX order:", err);
        }
      },
    }),

    // ---------- CREATE Data Analysis Order ----------
    createDataAnalysisOrder: builder.mutation({
      /*
        payload:
        {
          serviceType: "standard" | "urgent",
          dataType: string,
          mainDocument: File,
          supportingDocument?: File,
          additionalNotes?: string,
          appliedCoupon?: string | number,
        }

        Backend expects nested key: data_analysis_details.*
      */
      query: (payload) => {
        const formData = new FormData();

        // Base order fields
        formData.append("order_type", "data_analysis");
        if (payload.serviceType) {
          formData.append("service_type", payload.serviceType);
        }

        // Nested data_analysis_details fields
        if (payload.dataType) {
          formData.append("data_analysis_details.data_type", payload.dataType);
        }
        if (payload.additionalNotes) {
          formData.append(
            "data_analysis_details.additional_notes",
            payload.additionalNotes
          );
        }
        if (payload.mainDocument) {
          formData.append(
            "data_analysis_details.main_document",
            payload.mainDocument
          );
        }
        if (payload.supportingDocument) {
          formData.append(
            "data_analysis_details.supporting_document",
            payload.supportingDocument
          );
        }
        if (payload.appliedCoupon) {
          formData.append(
            "data_analysis_details.applied_coupon",
            payload.appliedCoupon
          );
        }

        return {
          url: "/orders/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addOrder(data));
        } catch (err) {
          console.error("Failed to create Data Analysis order:", err);
        }
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useLazyGetOrderQuery,
  useCreateLatexOrderMutation,
  useCreateDataAnalysisOrderMutation,
} = ordersApi;
