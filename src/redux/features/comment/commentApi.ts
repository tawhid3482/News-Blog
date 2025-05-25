import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comment/create-comment",
        method: "POST",
         data,
      }),
      invalidatesTags: [tagTypes.comment],
    }),
    getAllComment: builder.query({
      query: () => ({
        url: "/comment",
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),
  }),
});

export const { useCreateCommentMutation, useGetAllCommentQuery } = commentApi;
