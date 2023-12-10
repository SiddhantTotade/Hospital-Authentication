import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hospital-auththentication-app.onrender.com/auth/" }),
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
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedInUserQuery,
  useVerifyEmailQuery,
  useRequestRegistrationCodeMutation,
  useLogoutMutation,
} = authApi;
