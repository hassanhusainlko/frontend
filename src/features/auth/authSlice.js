import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("access_token");

const initialState = {
  user: null,
  token: tokenFromStorage || null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      if (user !== undefined) state.user = user;
      if (token !== undefined) {
        state.token = token;
        localStorage.setItem("access_token", token); // keep LS in sync
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "loading";
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    loadFromStorage(state) {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) state.token = storedToken;
    },
  },
});

export const { setCredentials, logout, setStatus, loadFromStorage } =
  authSlice.actions;

export default authSlice.reducer;
