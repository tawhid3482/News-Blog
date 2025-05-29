import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;
