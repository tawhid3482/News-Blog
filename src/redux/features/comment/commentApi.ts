import { baseApi } from "@/redux/api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comment/create-comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["news"]
    }),
    getAllComment: builder.query({
      query: () => ({
        url: "/comment",
        method: "GET",
      }),
      providesTags: ["comment"],
    }),
  }),
});

export const { useCreateCommentMutation, useGetAllCommentQuery } = commentApi;
