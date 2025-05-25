import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const authorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthorStats: builder.query({
      query: () => ({
        url: "/author/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.author],
    }),
  }),
});

export const { useGetAuthorStatsQuery } = authorApi;
