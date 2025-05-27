import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const subscriberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriber: builder.mutation({
      query: (data) => {
        console.log("Creating  data:", data);
        return {
          url: "/subscriber/create-subscriber",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.subscriber],
    }),
    getAllSubscriber: builder.query({
      query: () => ({
        url: "/subscriber",
        method: "GET",
      }),
      providesTags: [tagTypes.subscriber],
    }),

    getSubscriberByEmail: builder.query({
      query: (email: string ) => ({
        url: `/subscriber/${email}`,
        method: "GET",
      }),
      providesTags: [tagTypes.subscriber],
    }),
  }),
});

export const { useCreateSubscriberMutation, useGetAllSubscriberQuery , useGetSubscriberByEmailQuery} =
  subscriberApi;
