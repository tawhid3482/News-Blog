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
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllSuperUser: builder.query({
      query: () => ({
        url: "/user/super-users",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateSuperUser: builder.mutation({
      query: ({
        id,
        field,
      }: {
        id: string;
        field: "isActive" | "isVerified" | "isDeleted";
      }) => ({
        url: `/user/update-super-user/${id}`,
        method: "PATCH",
        data: { field },
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getUserStats: builder.query({
      query: () => ({
        url: "/user/stats",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateMYProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/user/update-my-profile",
          method: "PATCH",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/user/${id}/update-status`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetUserStatsQuery,
  useUpdateMYProfileMutation,
  useGetAllUserQuery,
  useGetAllSuperUserQuery,
  useUpdateSuperUserMutation,
  useUpdateUserStatusMutation,
} = UserApi;
