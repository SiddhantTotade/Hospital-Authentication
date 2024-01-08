import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const TESTING_PATH = "http://127.0.0.1:8000/auth/";
const REMOTE_PATH = "https://hospital-auththentication-app.onrender.com/auth/";

export const authApi = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: REMOTE_PATH,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (payload) => {
        return {
          url: "login/",
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getLoggedInUser: builder.query({
      query: (access_token) => {
        return {
          url: "profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    verifyEmail: builder.query({
      query: (token) => {
        return {
          url: `email_verify/?token=${token}`,
          method: "GET",
        };
      },
    }),
    requestRegistrationCode: builder.mutation({
      query: (payload) => {
        return {
          url: "generate_token/",
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    logout: builder.mutation({
      query: (payload) => {
        return {
          url: "logout/",
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    uploadSpeciality: builder.mutation({
      query: (payload) => {
        return {
          url: "speciality/",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${payload.access}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
    getSpeciality: builder.query({
      query: (payload) => {
        return {
          url: "speciality/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${payload}`,
          },
        };
      },
    }),
    uploadDoctorSpeciality: builder.mutation({
      query: (payload) => {
        return {
          url: "doctor_details/",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${payload.access}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
    getDoctorDetails: builder.query({
      query: (payload) => {
        return {
          url: "doctor_details/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${payload}`,
          },
        };
      },
    }),
    getAllDoctors: builder.query({
      query: (access) => {
        return {
          url: "all_doctor/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedInUserQuery,
  useVerifyEmailQuery,
  useRequestRegistrationCodeMutation,
  useLogoutMutation,
  useGetSpecialityQuery,
  useUploadSpecialityMutation,
  useGetDoctorDetailsQuery,
  useUploadDoctorSpecialityMutation,
  useGetAllDoctorsQuery,
} = authApi;
