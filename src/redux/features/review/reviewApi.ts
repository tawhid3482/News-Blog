import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => {
        console.log("Creating  data:", data);
        return {
          url: "/review/create-review",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.review],
    }),

    getAllReview: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    showAllReview: builder.query({
      query: () => ({
        url: "/review/show",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),


    getMyReview: builder.query({
      query: () => ({
        url: "/review/my-review",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    // ✅ Update Review
    updateReview: builder.mutation({
      query: (data) => ({
        url: "/review/update-review",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    // ✅ Delete Review (Soft delete)
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: "/review/delete-review",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [tagTypes.review],
    }),
    // reviewApi.ts
    updateReviewStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/review/${id}/update-review-status`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewQuery,
  useGetMyReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewStatusMutation,
  useShowAllReviewQuery
} = reviewApi;
