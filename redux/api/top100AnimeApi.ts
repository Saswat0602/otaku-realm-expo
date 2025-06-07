import { TOP100_ANIME_QUERY } from '@/lib/queries/top100Anime';
import type { AniListAnimeResponse, AnimeResponse } from '@/types/types';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const top100AnimeApi = createApi({
  reducerPath: 'top100AnimeApi',
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
    top100Anime: builder.query<AnimeResponse | null, { page: number }>({
      query: ({ page }) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: TOP100_ANIME_QUERY,
          variables: { page, perPage: 25 }
        }),
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (!response?.data?.Page?.media) {
          console.error('Invalid API response structure:', response);
          throw new Error('Invalid API response structure');
        }

        const animeList = response.data.Page.media
          .filter(anime => !anime.genres?.includes('Hentai'))
          .map(convertToAnime);

        return {
          data: animeList,
          pagination: convertPagination(response.data.Page.pageInfo)
        };
      },
      transformErrorResponse: (response) => {
        console.error('API Error:', response);
        return response;
      }
    }),
  }),
});

export const { useTop100AnimeQuery } = top100AnimeApi;
