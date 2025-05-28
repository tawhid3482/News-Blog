import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const opinionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOpinion: builder.mutation({
      query: (data) => ({
        url: "/opinion/create-opinion",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.opinion],
    }),
    getAllOpinion: builder.query({
      query: () => ({
        url: "/opinion?page=1&limit=6",
        method: "GET",
      }),
      providesTags: [tagTypes.opinion],
    }),

    getAllOpinionForSuperUser: builder.query({
      query: () => ({
        url: "/opinion/all-opinion",
        method: "GET",
      }),
      providesTags: [tagTypes.opinion],
    }),

    getSingleOpinion: builder.query({
      query: (id: string) => ({
        url: `/opinion/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.opinion],
    }),

    updateOpinion: builder.mutation({
      query: ({ opinionId, data }) => {
        console.log("Updating opinionId:", opinionId);
        return {
          url: `/opinion/update-opinion/${opinionId}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.opinion],
    }),

    deleteOpinion: builder.mutation({
      query: (id: string) => ({
        url: `/opinion/delete-opinion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.opinion],
    }),

    updateOpinionStatus: builder.mutation({
      query: ({ opinionId }) => ({
        url: `/opinion/${opinionId}/update-status`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.opinion],
    }),

    getAllMyOpinion: builder.query({
      query: () => ({
        url: "/opinion/my-opinions",
        method: "GET",
      }),
      providesTags: [tagTypes.opinion],
    }),

    getSingleAllMyOpinion: builder.query({
      query: (id: string) => ({
        url: `/opinion/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.opinion],
    }),
  }),
});

export const {
  useCreateOpinionMutation,
  useGetAllOpinionQuery,
  useGetSingleOpinionQuery,
  useUpdateOpinionMutation,
  useDeleteOpinionMutation,
  useUpdateOpinionStatusMutation,
  useGetAllMyOpinionQuery,
  useGetSingleAllMyOpinionQuery,
  useGetAllOpinionForSuperUserQuery
} = opinionApi;
