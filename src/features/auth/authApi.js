import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/auth",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/jwt/create/",
        method: "POST",
        body: credentials,
      }),
      // On success, we want to store token + user in authSlice
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // data should include { user, token }
          dispatch(setCredentials({ user: null, token: data.access }));
          // Optionally persist token to localStorage (demo only)
          localStorage.setItem("access_token", data.token);
        } catch (error) {
          // handle error if you want to show notifications, etc.
          console.error("Login failed: ", error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/jwt/blacklist/",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear credentials from state
        } finally {
          dispatch(logout());
          localStorage.removeItem("access_token");
        }
      },
    }),

    getMe: builder.query({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useLazyGetMeQuery } =
  authApi;
