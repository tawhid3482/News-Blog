import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getUserStats: builder.query({
      query: () => ({
        url: "/user/stats",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {  useGetSingleUserQuery,useGetUserStatsQuery } = UserApi;
