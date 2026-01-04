// src/features/orders/latexOrderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedOrder: null,

  status: "idle",
  error: null,

  filters: {
    orderType: "all",
    orderStatus: "all",
    serviceType: "all",
  },

  createForm: {
    serviceType: "standard",
    latexTitle: "",
    latexType: "",
    sourceFile: null,
    additionalNotes: "",
    appliedCoupon: null,
  },
};

const latexOrderSlice = createSlice({
  name: "latexOrder",
  initialState,
  reducers: {
    // ----- list / status -----
    setLatexOrders(state, action) {
      state.list = action.payload || [];
    },
    addLatexOrder(state, action) {
      state.list.unshift(action.payload);
    },
    updateLatexOrder(state, action) {
      const updated = action.payload;
      const index = state.list.findIndex((o) => o.id === updated.id);
      if (index !== -1)
        state.list[index] = { ...state.list[index], ...updated };
      if (state.selectedOrder?.id === updated.id) {
        state.selectedOrder = { ...state.selectedOrder, ...updated };
      }
    },
    removeLatexOrder(state, action) {
      const id = action.payload;
      state.list = state.list.filter((o) => o.id !== id);
      if (state.selectedOrder?.id === id) state.selectedOrder = null;
    },

    setSelectedLatexOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    clearSelectedLatexOrder(state) {
      state.selectedOrder = null;
    },

    // 👇 renamed to be latex-specific
    setLatexOrdersStatus(state, action) {
      state.status = action.payload;
    },
    setLatexOrdersError(state, action) {
      state.error = action.payload;
    },

    setLatexOrderFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearLatexOrderFilters(state) {
      state.filters = initialState.filters;
    },

    // ----- create form -----
    setLatexCreateOrderField(state, action) {
      const { field, value } = action.payload;
      state.createForm[field] = value;
    },
    setLatexCreateOrderForm(state, action) {
      state.createForm = { ...state.createForm, ...action.payload };
    },
    resetLatexCreateOrderForm(state) {
      state.createForm = initialState.createForm;
    },

    clearLatexOrdersState() {
      return initialState;
    },
  },
});

export const {
  setLatexOrders,
  addLatexOrder,
  updateLatexOrder,
  removeLatexOrder,
  setSelectedLatexOrder,
  clearSelectedLatexOrder,
  setLatexOrdersStatus,
  setLatexOrdersError,
  setLatexOrderFilters,
  clearLatexOrderFilters,
  setLatexCreateOrderField,
  setLatexCreateOrderForm,
  resetLatexCreateOrderForm,
  clearLatexOrdersState,
} = latexOrderSlice.actions;

export default latexOrderSlice.reducer;
