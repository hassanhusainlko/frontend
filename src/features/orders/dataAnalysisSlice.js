import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  // optional list & selection, if you want to track data-analysis-specific orders
  list: [],
  selectedDataOrder: null,

  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  // Form for creating a Data Analysis order
  createForm: {
    orderType: "data_analysis",
    serviceType: "standard", // maps to Order.service_type
    dataTitle: "",
    dataObjective: "",
    dataType: "",
    mainDocument: "",
    supportingDocument: "",
    additionalNotes: "",
    appliedCoupon: "", // coupon code or ID
  },
};

const dataAnalysisSlice = createSlice({
  name: "dataAnalysis",
  initialState,
  reducers: {
    // ---------- list / selection (optional) ----------
    setDataAnalysisOrders(state, action) {
      state.list = action.payload || [];
    },
    addDataAnalysisOrder(state, action) {
      state.list.unshift(action.payload);
    },
    setSelectedDataOrder(state, action) {
      state.selectedDataOrder = action.payload;
    },
    clearSelectedDataOrder(state) {
      state.selectedDataOrder = null;
    },

    setDataAnalysisStatus(state, action) {
      state.status = action.payload;
    },
    setDataAnalysisError(state, action) {
      state.error = action.payload;
    },

    // ---------- create form ----------
    setDataAnalysisField(state, action) {
      const { field, value } = action.payload;
      state.createForm[field] = value;
    },

    setDataAnalysisForm(state, action) {
      state.createForm = {
        ...state.createForm,
        ...action.payload,
      };
    },

    resetDataAnalysisForm(state) {
      state.createForm = initialState.createForm;
    },

    // Clear everything (e.g. on logout)
    clearDataAnalysisState(state) {
      state.list = [];
      state.selectedDataOrder = null;
      state.status = "idle";
      state.error = null;
      state.createForm = initialState.createForm;
    },
  },
});

export const {
  setDataAnalysisOrders,
  addDataAnalysisOrder,
  setSelectedDataOrder,
  clearSelectedDataOrder,
  setDataAnalysisStatus,
  setDataAnalysisError,
  setDataAnalysisField,
  setDataAnalysisForm,
  resetDataAnalysisForm,
  clearDataAnalysisState,
} = dataAnalysisSlice.actions;

export default dataAnalysisSlice.reducer;
