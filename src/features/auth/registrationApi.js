import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearRegistrationDetails } from "./registrationSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (registrationData) => ({
        url: "/auth/users/",
        method: "POST",
        body: registrationData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearRegistrationDetails());
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation } = registrationApi;

export default registrationApi;
