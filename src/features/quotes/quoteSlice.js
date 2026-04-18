import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  stepOneData: {
    name: "",
    email: "",
    service_category: "",
    description: "",
  },
  stepTwoData: {},      // service-specific fields (latex or data_analysis)
  quoteId: null,        // returned from POST /quotes/request-quote/
  quoteResponse: null,  // full quote object
  orderId: null,        // returned from POST /quotes/{id}/accept/
  status: "idle",       // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    setQuoteStep(state, action) {
      state.step = action.payload;
    },
    setStepOneData(state, action) {
      state.stepOneData = { ...state.stepOneData, ...action.payload };
    },
    setStepTwoData(state, action) {
      state.stepTwoData = { ...state.stepTwoData, ...action.payload };
    },
    setQuoteId(state, action) {
      state.quoteId = action.payload;
    },
    setQuoteResponse(state, action) {
      state.quoteResponse = action.payload;
    },
    setOrderId(state, action) {
      state.orderId = action.payload;
    },
    setQuoteStatus(state, action) {
      state.status = action.payload;
    },
    setQuoteError(state, action) {
      state.error = action.payload;
    },
    resetQuoteWizard(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setQuoteStep,
  setStepOneData,
  setStepTwoData,
  setQuoteId,
  setQuoteResponse,
  setOrderId,
  setQuoteStatus,
  setQuoteError,
  resetQuoteWizard,
} = quoteSlice.actions;

export default quoteSlice.reducer;
