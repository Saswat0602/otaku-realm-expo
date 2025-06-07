import { SEASONAL_ANIME_QUERY, TRENDING_ANIME_QUERY } from '@/lib/queries/fetchAnime';
import type { AniListAnimeResponse, Anime, AnimeResponse } from '@/types/types';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const animeApi = createApi({
  reducerPath: 'animeApi',
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
    getTrendingAnime: builder.query<{ data: Anime[], pagination: { hasNextPage: boolean } }, { page: number }>({
      query: ({ page = 1 }) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: TRENDING_ANIME_QUERY,
          variables: {
            page,
            perPage: 20
          }
        }),
      }),
      transformResponse: (response: any) => {
        if (!response?.data?.Page?.media) {
          console.error('Invalid API response structure:', response);
          throw new Error('Invalid API response structure');
        }

        const animeList = response.data.Page.media
          .filter((anime: any) => !anime.genres.includes('Hentai'))
          .map(convertToAnime);

        return {
          data: animeList,
          pagination: {
            hasNextPage: response.data.Page.pageInfo.hasNextPage
          }
        };
      },
      transformErrorResponse: (response) => {
        console.error('API Error:', response);
        return response;
      }
    }),

    seasonalAnime: builder.query<
      AnimeResponse | null,
      { year: number; season: 'winter' | 'spring' | 'summer' | 'fall'; page?: number }
    >({
      query: ({ year, season, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: SEASONAL_ANIME_QUERY,
          variables: {
            page,
            perPage: 12,
            season: season.toUpperCase(),
            seasonYear: year
          }
        }
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data && response.data.Page) {
          const animeList = response.data.Page.media
            .filter(anime => !(anime.genres?.includes("Hentai")))
            .map(convertToAnime);

          return {
            data: animeList,
            pagination: convertPagination(response.data.Page.pageInfo)
          };
        }
        return null;
      },
    }),
  }),
});

export const { useGetTrendingAnimeQuery, useSeasonalAnimeQuery } = animeApi;