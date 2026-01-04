// src/features/profile/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    // maps to user_type
    userType: "", // "research" | "corporate" etc.

    // common fields
    designation: "",
    mobileNumber: "",
    whatsappNumber: "",
    country: "",

    // many-to-many coupon relations (store as IDs or code strings)
    referralCodes: [], // e.g. ["REF123", "REF456"] or [1,2,3]
    promotionalCodes: [], // e.g. ["PROMO10", "PROMO20"] or [4,5]

    // mostly for students
    highestDegree: "",
    institute: "",

    // mostly for professionals
    company: "",
    jobTitle: "",
  },
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Replace/merge profile data in one go
    setProfile(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },

    // Update only a few fields (partial update)
    updateProfileFields(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },

    // Clear profile (e.g. on logout)
    clearProfile(state) {
      state.data = initialState.data;
      state.status = "idle";
      state.error = null;
    },

    setProfileStatus(state, action) {
      state.status = action.payload; // "idle" | "loading" | "succeeded" | "failed"
    },

    setProfileError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  updateProfileFields,
  clearProfile,
  setProfileStatus,
  setProfileError,
} = profileSlice.actions;

export default profileSlice.reducer;
