// src/features/quotes/quoteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    serviceType: "standard", // 'standard' | 'urgent'
    pages: "",               // string or number from input
  },
  lastQuote: null,           // { amount, currency, ... } from backend
  status: "idle",            // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    setQuoteFormField(state, action) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    setQuoteForm(state, action) {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    resetQuoteForm(state) {
      state.form = initialState.form;
    },
    setQuote(state, action) {
      state.lastQuote = action.payload;
    },
    setQuoteStatus(state, action) {
      state.status = action.payload;
    },
    setQuoteError(state, action) {
      state.error = action.payload;
    },
    clearQuoteState(state) {
      state.form = initialState.form;
      state.lastQuote = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setQuoteFormField,
  setQuoteForm,
  resetQuoteForm,
  setQuote,
  setQuoteStatus,
  setQuoteError,
  clearQuoteState,
} = quoteSlice.actions;

export default quoteSlice.reducer;
