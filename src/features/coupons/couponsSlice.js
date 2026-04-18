import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myCoupons: [],
  validation: null, // { coupon, discount, final_price }
  status: "idle",   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    setMyCoupons(state, action) {
      state.myCoupons = action.payload;
    },
    setValidation(state, action) {
      state.validation = action.payload;
    },
    clearValidation(state) {
      state.validation = null;
    },
    setCouponsStatus(state, action) {
      state.status = action.payload;
    },
    setCouponsError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setMyCoupons,
  setValidation,
  clearValidation,
  setCouponsStatus,
  setCouponsError,
} = couponsSlice.actions;

export default couponsSlice.reducer;
