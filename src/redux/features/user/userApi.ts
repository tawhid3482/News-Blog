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

    updateMYProfile: builder.mutation({
      query: (formData) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [tagTypes.user]
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetUserStatsQuery,
  useUpdateMYProfileMutation,
} = UserApi;
