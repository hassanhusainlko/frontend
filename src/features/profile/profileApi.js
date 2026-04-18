import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProfile, setProfileStatus, setProfileError } from "./profileSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const mapProfileFromApi = (p) => ({
  userType: p.user_type,
  mobileNumber: p.mobile_number,
  whatsappNumber: p.whatsapp_number,
  country: p.country,
  highestDegree: p.highest_degree,
  institute: p.institute,
  company: p.company,
  jobTitle: p.job_title,
});

const mapProfileToApi = (p) => ({
  user_type: p.userType,
  mobile_number: p.mobileNumber,
  whatsapp_number: p.whatsappNumber,
  country: p.country,
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
    getProfile: builder.query({
      query: () => "/profile/me/",
      providesTags: ["Profile"],
      transformResponse: (response) => mapProfileFromApi(response),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setProfileStatus("loading"));
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
          dispatch(setProfileStatus("succeeded"));
          dispatch(setProfileError(null));
        } catch (err) {
          dispatch(setProfileStatus("failed"));
          dispatch(
            setProfileError(
              err?.data?.detail || err?.data?.message || "Failed to load profile"
            )
          );
        }
      },
    }),

    createProfile: builder.mutation({
      query: (profileData) => ({
        url: "/profile/me/",
        method: "POST",
        body: mapProfileToApi(profileData),
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setProfileStatus("loading"));
          const { data } = await queryFulfilled;
          dispatch(setProfile(mapProfileFromApi(data)));
          dispatch(setProfileStatus("succeeded"));
          dispatch(setProfileError(null));
        } catch (err) {
          dispatch(setProfileStatus("failed"));
          dispatch(
            setProfileError(
              err?.data?.detail || err?.data?.message || "Failed to create profile"
            )
          );
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (partialProfile) => ({
        url: "/profile/me/",
        method: "PATCH",
        body: mapProfileToApi(partialProfile),
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setProfileStatus("loading"));
          const { data } = await queryFulfilled;
          dispatch(setProfile(mapProfileFromApi(data)));
          dispatch(setProfileStatus("succeeded"));
          dispatch(setProfileError(null));
        } catch (err) {
          dispatch(setProfileStatus("failed"));
          dispatch(
            setProfileError(
              err?.data?.detail || err?.data?.message || "Failed to update profile"
            )
          );
        }
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} = profileApi;
