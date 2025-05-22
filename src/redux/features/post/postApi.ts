import { baseApi } from "@/redux/api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["news"],
    }),

    getAllPost: builder.query({
      query: (searchTerm: string) => {
        return {
          url: "/post",
          method: "GET",
          params: searchTerm ? { searchTerm } : {},
        };
      },
      providesTags: ["news"],
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostQuery } = postApi;
