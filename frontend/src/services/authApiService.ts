import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/auth/" }),
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
    loginUserGoogle: builder.mutation({
      query: (data) => {
        return {
          url: `o/google-oauth2/?state=${data.state}&code=${data.code}`,
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
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
    resendVerifyEmail: builder.query({
      query: (access_token) => {
        return {
          url: "resend_email_verify/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({ payload, access }) => {
        return {
          url: "change-password/",
          method: "POST",
          body: payload,
          headers: {
            authorization: `Bearer ${access}`,
          },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "reset-password/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
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
    resetPassword: builder.mutation({
      query: ({ uid, token, password, password2 }) => {
        return {
          url: `reset-password/${uid}/${token}/`,
          method: "POST",
          body: { password, password2 },
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
  useLoginUserGoogleMutation,
  useGetLoggedInUserQuery,
  useChangeUserPasswordMutation,
  useVerifyEmailQuery,
  useLazyResendVerifyEmailQuery,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useRequestRegistrationCodeMutation,
  useLogoutMutation,
} = authApi;
