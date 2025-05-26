import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";


const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => ({
        url: "/admin/admin-stats",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
  }),
});

export const { useGetAdminStatsQuery } = adminApi;
