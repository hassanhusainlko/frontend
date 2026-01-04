import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProfile, setProfileStatus, setProfileError } from "./profileSlice";
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
// Base query with auth header support
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE + "/store", // adjust to match your backend root
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Helper: map backend snake_case → frontend camelCase
const mapProfileFromApi = (p) => ({
  userType: p.user_type,
  designation: p.designation,
  mobileNumber: p.mobile_number,
  whatsappNumber: p.whatsapp_number,
  country: p.country,
  referralCodes: p.referral_code ?? [], // ManyToMany; could be ids or nested objects
  promotionalCodes: p.promotional_code ?? [], // same as above
  highestDegree: p.highest_degree,
  institute: p.institute,
  company: p.company,
  jobTitle: p.job_title,
});

const mapProfileToApi = (p) => ({
  user_type: p.userType,
  designation: p.designation,
  mobile_number: p.mobileNumber,
  whatsapp_number: p.whatsappNumber,
  country: p.country,
  referral_code: p.referralCodes,
  promotional_code: p.promotionalCodes,
  highest_degree: p.highestDegree,
  institute: p.institute,
  company: p.company,
  job_title: p.jobTitle,
});

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    // GET /api/profile/  → current user's profile
    getProfile: builder.query({
      query: () => "profile/", // adjust if your endpoint is different
      providesTags: ["Profile"],
      transformResponse: (response) => mapProfileFromApi(response),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setProfileStatus("loading"));
          const { data } = await queryFulfilled;
          dispatch(setProfile(data)); // put into profile slice
          dispatch(setProfileStatus("succeeded"));
          dispatch(setProfileError(null));
        } catch (err) {
          dispatch(setProfileStatus("failed"));
          dispatch(
            setProfileError(
              err?.data?.detail ||
                err?.data?.message ||
                err?.error ||
                "Failed to load profile"
            )
          );
        }
      },
    }),

    // PATCH /api/profile/  → update current user's profile
    updateProfile: builder.mutation({
      // `partialProfile` is camelCase from frontend
      query: (partialProfile) => ({
        url: "/profile/", // adjust if needed (could be `/profile/me/`)
        method: "PATCH",
        body: mapProfileToApi(partialProfile),
      }),
      invalidatesTags: ["Profile"], // refetch getProfile after success
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setProfileStatus("loading"));
          const { data } = await queryFulfilled;
          // backend returns updated profile in snake_case → normalize and store
          const normalized = mapProfileFromApi(data);
          dispatch(setProfile(normalized));
          dispatch(setProfileStatus("succeeded"));
          dispatch(setProfileError(null));
        } catch (err) {
          dispatch(setProfileStatus("failed"));
          dispatch(
            setProfileError(
              err?.data?.detail ||
                err?.data?.message ||
                err?.error ||
                "Failed to update profile"
            )
          );
        }
      },
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
