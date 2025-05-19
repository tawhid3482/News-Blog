import { baseApi } from "@/redux/api/baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createReaction: builder.mutation({
    //   query: (data) => ({
    //     url: "/reaction/create-react",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags:["news"]
    // }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {  useGetMeQuery } = UserApi;
