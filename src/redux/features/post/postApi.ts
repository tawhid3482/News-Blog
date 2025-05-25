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

    getAllPost: builder.query({
      query: (searchTerm: string) => {
        return {
          url: "/post",
          method: "GET",
          params: searchTerm ? { searchTerm } : {},
        };
      },
      providesTags: [tagTypes.news],
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostQuery } = postApi;
