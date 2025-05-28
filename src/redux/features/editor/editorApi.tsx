import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const editorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEditorStats: builder.query({
      query: () => ({
        url: "/editor/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.editor],
    }),
  }),
});

export const { useGetEditorStatsQuery } = editorApi;
