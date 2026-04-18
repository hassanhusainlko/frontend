import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth`,
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: null, token: data.access }));
          localStorage.setItem("access_token", data.access);
        } catch (error) {
          console.error("Login failed:", error);
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
        } finally {
          dispatch(logout());
          localStorage.removeItem("access_token");
        }
      },
    }),

    activateAccount: builder.mutation({
      query: ({ uid, token }) => ({
        url: "/users/activation/",
        method: "POST",
        body: { uid, token },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),

    resetPasswordConfirm: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),

    getMe: builder.query({
      query: () => "/users/me/",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useActivateAccountMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useLazyGetMeQuery,
} = authApi;
