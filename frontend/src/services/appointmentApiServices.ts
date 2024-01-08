import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const TESTING_PATH = "http://127.0.0.1:8000/api/";
const REMOTE_PATH = "https://hospital-auththentication-app.onrender.com/api/";

export const appointmentApi = createApi({
  reducerPath: "appointmentAppAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: REMOTE_PATH,
  }),
  endpoints: (builder) => ({
    registerAppointment: builder.mutation({
      query: (payload) => {
        return {
          url: "appointments/",
          method: "POST",
          body: payload,
          headers: {
            authorization: `Bearer ${payload.access}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
    getAppointments: builder.query({
      query: (payload) => {
        return {
          url: "appointments/",
          method: "GET",
          headers: {
            authorization: `Bearer ${payload}`,
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
  useRegisterAppointmentMutation,
  useGetAllDoctorsQuery,
  useGetAppointmentsQuery,
} = appointmentApi;
