import { baseApi } from "@/redux/api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        body: data,
      }),
    }),
    getAllPost: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      providesTags: ["news"],
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostQuery } = postApi;
