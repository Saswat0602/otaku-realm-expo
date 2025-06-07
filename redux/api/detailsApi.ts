import { ANIME_DETAILS_QUERY } from '@/lib/queries/detailsQueries';
import type { AnimeDetailsResponse } from '@/types/animeDetails';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const detailsApi = createApi({
  reducerPath: 'detailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://graphql.anilist.co',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      if (process.env.ANILIST_TOKEN) {
        headers.set('Authorization', `Bearer ${process.env.ANILIST_TOKEN}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    animeDetails: builder.query<AnimeDetailsResponse['data']['Media'], string>({
      query: (id) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: ANIME_DETAILS_QUERY,
          variables: { id: parseInt(id, 10) },
        }),
      }),
      transformResponse: (response: AnimeDetailsResponse) => {
        if (!response?.data?.Media) {
          console.error('Invalid API response structure:', response);
          throw new Error('Invalid API response structure');
        }
        return response.data.Media;
      },
      transformErrorResponse: (response) => {
        console.error('API Error:', response);
        return response;
      }
    }),
  }),
});

export const { useAnimeDetailsQuery } = detailsApi;
