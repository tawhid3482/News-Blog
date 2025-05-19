import { baseApi } from "@/redux/api/baseApi";

const reactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReaction: builder.mutation({
      query: (data) => ({
        url: "/reaction/create-react",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["news"]
    }),
    getAllReaction: builder.query({
      query: () => ({
        url: "/reaction",
        method: "GET",
      }),
      providesTags: ["reaction"],
    }),
  }),
});

export const { useCreateReactionMutation, useGetAllReactionQuery } = reactionApi;
