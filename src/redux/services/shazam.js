import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "c267f0fdd4mshaa1faf5c0306738p1c1472jsn9e03b175e786"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/charts/track?pageSize=20",
    }),
    getSongDetails: builder.query({
      query: ({ songId = "", artistId = "" }) =>
        `/songs${artistId ? "/v2" : ""}/get-details?${
          artistId ? `id=${artistId}` : `key=${songId}`
        }&l=en-US`,
    }),
    getSongRelated: builder.query({
      query: ({ songId }) =>
        `/shazam-songs/list-similarities?id=track-similarities-id-${songId}&locale=en-US`,
    }),
    getArtistTopSongs: builder.query({
      query: ({ artistId }) => `/artists/get-summary?id=${artistId}&l=en-US`,
    }),
    getSongsBySearch: builder.query({
      query: ({ searchTerm, searchOffset = 0 }) =>
        `https://shazam.p.rapidapi.com/search?term=${searchTerm}&locale=en-US&offset=${searchOffset}&limit=5`,
    }),
    getListId: builder.query({
      query: () => "https://shazam.p.rapidapi.com/charts/list",
    }),
    getListById: builder.query({
      query: ({ pageSize = 20, listId = "", startFrom = 0 }) =>
        `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=${pageSize}&startFrom=${startFrom}&listId=${listId}`,
    }),
    getSongsByCountry: builder.query({
      query: ({ pageSize = 20, country = "", startFrom = 0 }) =>
        `https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=ip-country-chart-${country}&pageSize=${pageSize}&startFrom=${startFrom}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistTopSongsQuery,
  useGetSongsBySearchQuery,
  useGetListIdQuery,
  useGetListByIdQuery,
  useGetSongsByCountryQuery,
} = shazamApi;
