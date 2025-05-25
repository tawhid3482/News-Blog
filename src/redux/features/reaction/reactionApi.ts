import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const reactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReaction: builder.mutation({
      query: (data) => {
        console.log("Creating  data:", data);
        return {
          url: "/reaction/create-react",
          method: "POST",
          data,
        };
      },
      invalidatesTags:[tagTypes.reaction]
    }),
    getAllReaction: builder.query({
      query: () => ({
        url: "/reaction",
        method: "GET",
      }),
      providesTags: [tagTypes.reaction],
    }),
  }),
});

export const { useCreateReactionMutation, useGetAllReactionQuery } = reactionApi;
