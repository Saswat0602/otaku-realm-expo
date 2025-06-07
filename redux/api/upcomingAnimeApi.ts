import { UPCOMING_NEXT_SEASON_QUERY } from '@/lib/queries/upComingNextSeason';
import type { AniListAnimeResponse, AnimeResponse } from '@/types/types';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const upComingAnimeApi = createApi({
  reducerPath: 'upComingAnimeApi',
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
    upcomingAnime: builder.query<AnimeResponse | null, number>({
      query: (page = 1) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: UPCOMING_NEXT_SEASON_QUERY,
          variables: { page, perPage: 18 },
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

export const { useUpcomingAnimeQuery } = upComingAnimeApi;
