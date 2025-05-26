import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const reactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/user/create-admin",
          method: "POST",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.superUser],
    }),
    createAuthor: builder.mutation({
      query: (data) => {
        return {
          url: "/user/create-author",
          method: "POST",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.superUser],
    }),
    createEditor: builder.mutation({
      query: (data) => {
        return {
          url: "/user/create-editor",
          method: "POST",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.superUser],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useCreateAuthorMutation,
  useCreateEditorMutation,
} = reactionApi;
