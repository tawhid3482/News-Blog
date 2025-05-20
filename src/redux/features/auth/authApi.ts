import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: userInfo,
      }),
    }),
    signupWithSocial: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/social-login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserByEmail: builder.query({
      query: (email: string | undefined) => ({
        url: `/auth/users/${email}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ email, payload }) => ({
        url: `/users/${email}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetAllUserQuery,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
  useSignupWithSocialMutation
} = authApi;
