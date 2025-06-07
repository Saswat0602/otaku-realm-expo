import { SEARCH_ANIME_QUERY } from '@/lib/queries/searchQueries';
import { AniListAnimeResponse, AnimeResponse } from '@/types/types';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchAnimeApi = createApi({
  reducerPath: 'searchAnimeApi',
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
  tagTypes: ['SearchAnime'],
  endpoints: (builder) => ({
    searchAnime: builder.query<
      AnimeResponse | null,
      {
        page: number;
        search?: string;
        genres?: string[];
        year?: string;
        season?: string;
        format?: string[];
        airingStatus?: string;
      }
    >({
      query: ({ page, search, genres, year, season, format, airingStatus }) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: SEARCH_ANIME_QUERY,
          variables: {
            page,
            perPage: 24,
            search: search || undefined,
            genres: genres?.length ? genres : undefined,
            seasonYear: year ? parseInt(year) : undefined,
            season: season || undefined,
            format: format?.length ? format : undefined,
            status: airingStatus || undefined,
          },
        }),
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (!response?.data?.Page?.media) {
          console.error('Invalid API response structure:', response);
          throw new Error('Invalid API response structure');
        }

        const animeList = response.data.Page.media
          .filter((anime) => !anime.genres?.includes('Hentai'))
          .map(convertToAnime);

        return {
          data: animeList,
          pagination: convertPagination(response.data.Page.pageInfo)
        };
      },
      transformErrorResponse: (response) => {
        console.error('API Error:', response);
        return response;
      },
      serializeQueryArgs: ({ queryArgs }: { queryArgs: any }) => {
        const normalized = {
          page: queryArgs.page,
          search: queryArgs.search || '',
          genres: queryArgs.genres?.slice().sort().join(',') || '',
          year: queryArgs.year || '',
          season: queryArgs.season || '',
          format: queryArgs.format?.slice().sort().join(',') || '',
          airingStatus: queryArgs.airingStatus || '',
        };
        return JSON.stringify(normalized);
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useSearchAnimeQuery } = searchAnimeApi;
