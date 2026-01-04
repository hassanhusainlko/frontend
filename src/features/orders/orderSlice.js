import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // All orders from /orders/
  list: [],
  selectedOrder: null,

  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  // Simple filters you can use in UI (optional)
  filters: {
    orderType: "all", // 'all' | 'latex' | 'data_analysis'
    orderStatus: "all", // 'all' | 'pending' | 'in_progress' | 'under_review' | 'completed'
    serviceType: "all", // 'all' | 'standard' | 'urgent'
  },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Replace entire list (used after GET /orders/)
    setOrders(state, action) {
      state.list = action.payload || [];
    },

    // Add single order (e.g. after creating new one)
    addOrder(state, action) {
      state.list.unshift(action.payload);
    },

    // Update an existing order by id
    updateOrder(state, action) {
      const updated = action.payload;
      const index = state.list.findIndex((o) => o.id === updated.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updated };
      }
      if (state.selectedOrder && state.selectedOrder.id === updated.id) {
        state.selectedOrder = { ...state.selectedOrder, ...updated };
      }
    },

    // Remove by id
    removeOrder(state, action) {
      const id = action.payload;
      state.list = state.list.filter((o) => o.id !== id);
      if (state.selectedOrder && state.selectedOrder.id === id) {
        state.selectedOrder = null;
      }
    },

    // For order details page (optional)
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    },

    // Async status
    setOrdersStatus(state, action) {
      state.status = action.payload;
    },
    setOrdersError(state, action) {
      state.error = action.payload;
    },

    // Filters
    setOrderFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearOrderFilters(state) {
      state.filters = initialState.filters;
    },

    // Clear everything (e.g. on logout)
    clearOrdersState(state) {
      state.list = [];
      state.selectedOrder = null;
      state.status = "idle";
      state.error = null;
      state.filters = initialState.filters;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrder,
  removeOrder,
  setSelectedOrder,
  clearSelectedOrder,
  setOrdersStatus,
  setOrdersError,
  setOrderFilters,
  clearOrderFilters,
  clearOrdersState,
} = ordersSlice.actions;

export default ordersSlice.reducer;
