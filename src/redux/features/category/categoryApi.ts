import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category/create-category",
          method: "POST",
           data,
        };
      },
      invalidatesTags: [tagTypes.category],
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    updateCategory: builder.mutation({
      query: (id) => ({
        url: `/update-category/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
