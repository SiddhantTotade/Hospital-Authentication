import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TESTING_PATH = "http://127.0.0.1:8000/blog/";
// const REMOTE_PATH = "https://hospital-auththentication-app.onrender.com/auth/";

export const appApi = createApi({
  reducerPath: "userAppAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: TESTING_PATH,
  }),
  endpoints: (builder) => ({
    registerBlog: builder.mutation({
      query: (payload) => {
        return {
          url: "blogs/",
          method: "POST",
          body: payload,
          headers: {
            authorization: `Bearer ${payload.access}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
    getBlog: builder.query({
      query: (access) => {
        return {
          url: "blogs/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access}`,
          },
        };
      },
    }),
    registerCategory: builder.mutation({
      query: (payload) => {
        return {
          url: "category/",
          method: "POST",
          body: payload,
          headers: {
            authorization: `Bearer ${payload.access}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
    getCategory: builder.query({
      query: (access) => {
        return {
          url: "category/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access}`,
          },
        };
      },
    }),
    getDetailBlog: builder.query({
      query: (payload) => {
        return {
          url: `blogs/${payload.slug}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${payload.access}`,
          },
        };
      },
    }),
    getMyBlog: builder.query({
      query: (access) => {
        return {
          url: `my-blogs/`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access}`,
          },
        };
      },
    }),
    toggleDraft: builder.mutation({
      query: (payload) => {
        return {
          url: `update-draft/${payload.id}/`,
          method: "POST",
          headers: {
            authorization: `Bearer ${payload.access}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterBlogMutation,
  useGetBlogQuery,
  useRegisterCategoryMutation,
  useGetCategoryQuery,
  useGetDetailBlogQuery,
  useGetMyBlogQuery,
  useToggleDraftMutation,
} = appApi;
