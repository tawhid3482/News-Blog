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
        url: "/post",
        method: "GET",
      }),
      providesTags: [tagTypes.news],
    }),
    
    getAllPost: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      providesTags: [tagTypes.news],
    }),
    getAllPostForSuperUser: builder.query({
      query: () => ({
        url: "/post/all-posts",
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
    trackPostView: builder.mutation({
      query: (postId: string) => ({
        url: `/post/${postId}/view`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.news],
    }),

    updateReadingTime: builder.mutation({
      query: ({ postId, timeSpent }) => ({
        url: `/post/${postId}/reading-time`,
        method: "PATCH",
        body: { timeSpent },
      }),
      invalidatesTags: [tagTypes.news],
    }),

    manageNews: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/post/${postId}/manage-news`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.news],
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
  useManageNewsMutation,
  useGetAllPostQuery,
  useGetAllPostForSuperUserQuery
} = postApi;
