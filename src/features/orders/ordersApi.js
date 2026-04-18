import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setOrders,
  setOrdersStatus,
  setOrdersError,
  addOrder,
  updateOrder,
} from "./orderSlice";

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

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // GET /orders/orders/
    getOrders: builder.query({
      query: () => "/orders/orders/",
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
          dispatch(setOrdersStatus("failed"));
          dispatch(
            setOrdersError(
              err?.data?.detail || err?.data?.message || "Failed to load orders"
            )
          );
        }
      },
    }),

    // GET /orders/orders/{id}/
    getOrder: builder.query({
      query: (id) => `/orders/orders/${id}/`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateOrder(data));
        } catch (err) {
          console.error("Failed to load order:", err);
        }
      },
    }),

    // POST /orders/orders/
    createOrder: builder.mutation({
      query: ({ service_category, priority = "standard" }) => ({
        url: "/orders/orders/",
        method: "POST",
        body: { service_category, priority },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addOrder(data));
        } catch (err) {
          console.error("Failed to create order:", err);
        }
      },
    }),

    // POST /orders/orders/{id}/upload-file/
    uploadOrderFile: builder.mutation({
      query: ({ orderId, file, file_type = "client_main_file" }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("file_type", file_type);
        return {
          url: `/orders/orders/${orderId}/upload-file/`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Orders", id: orderId },
      ],
    }),

    // POST /orders/orders/{id}/request-revision/
    requestRevision: builder.mutation({
      query: ({ orderId, message }) => ({
        url: `/orders/orders/${orderId}/request-revision/`,
        method: "POST",
        body: { message },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Orders", id: orderId },
      ],
    }),

    // POST /orders/orders/{id}/approve-preview/
    approvePreview: builder.mutation({
      query: (orderId) => ({
        url: `/orders/orders/${orderId}/approve-preview/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, orderId) => [
        { type: "Orders", id: orderId },
      ],
    }),

    // PATCH /orders/orders/{id}/
    updateOrderDetails: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/orders/orders/${id}/`,
        method: "PATCH",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Orders", id }],
    }),

    // GET /orders/orders/{id}/status-history/
    getStatusHistory: builder.query({
      query: (orderId) => `/orders/orders/${orderId}/status-history/`,
      providesTags: (result, error, orderId) => [
        { type: "Orders", id: `${orderId}-history` },
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUploadOrderFileMutation,
  useRequestRevisionMutation,
  useApprovePreviewMutation,
  useGetStatusHistoryQuery,
  useUpdateOrderDetailsMutation,
} = ordersApi;
