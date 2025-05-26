import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "/post/create-post",
          method: "POST",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.news],
    }),

    getAllMyPost: builder.query({
      query: () => ({
        url: "/post/my-posts",
        method: "GET",
      }),
      providesTags: [tagTypes.news],
    }),

    getSinglePost: builder.query({
      query: ({ postId }) => ({
        url: `/post/${postId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.news],
    }),

    updateNews: builder.mutation({
      query: ({ data, postId }) => {
        return {
          url: `/post/${postId}/update-news`,
          method: "PATCH",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.news],
    }),
    // 👇 View Tracking API
    trackPostView: builder.mutation({
      query: (postId: string) => ({
        url: `/post/${postId}/view`,
        method: "POST",
      }),
    }),

    updateReadingTime: builder.mutation({
      query: ({ postId, timeSpent }) => ({
        url: `/post/${postId}/reading-time`,
        method: "PATCH",
        body: { timeSpent },
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllMyPostQuery,
  useTrackPostViewMutation,
  useUpdateReadingTimeMutation,
  useUpdateNewsMutation,
  useGetSinglePostQuery,
} = postApi;
