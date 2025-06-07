import { SEASONAL_ANIME_QUERY, TRENDING_ANIME_QUERY } from '@/lib/queries/fetchAnime';
import type { AniListAnimeResponse, Anime, AnimeResponse } from '@/types/types';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU5ZDZiNDg3ZTQ1NWJiODMwMjUyNTc2ODNmZWMzZjE4MWU3NzQ1NGI2MTUxYmIxNmU1MjIzN2FiYzZhZWIxMDFkZjAxMWJiYmM2ZTAyNTI4In0.eyJhdWQiOiIyNjM1OSIsImp0aSI6IjU5ZDZiNDg3ZTQ1NWJiODMwMjUyNTc2ODNmZWMzZjE4MWU3NzQ1NGI2MTUxYmIxNmU1MjIzN2FiYzZhZWIxMDFkZjAxMWJiYmM2ZTAyNTI4IiwiaWF0IjoxNzQ1ODM2NjkxLCJuYmYiOjE3NDU4MzY2OTEsImV4cCI6MTc3NzM3MjY5MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.AFbaWKMhJX01O9CbBofrNzPIGiWJkJWelRU_1i1OAyGzrmFztDUzoUl-SIa0prC04bfyKn4kUEGq5cerNM_tfuxy42gKdS9uvhIl5sMU5BKm08jJ3a_Nuz9H1IXal9cb8Z2xwkfYsYcX8XvN_S_WxArrhu49eBCf3KtIIrKnAbFdo1r4OU0gNrMDO63HQdltkfIol0IxziVRAg-A_9Sa_zjzT6qmwTpFiPRYtZICgoIZ8xaSCi2ZC26z2gRiyGsIKeZYRqLPU7lGPIJFSDICf11U81jO_LJczOUS-la2XUIZA0cUrlFFFoWhAmaWd1OCY0O_ToRvelnBUqow1qSKIIY0POEyninv6u6CBadcLsW_u9RdWGZbmC3QsnVsUInvQYN83xF3SueRIMkzKbq2910xpRTyy-8ATEaZppCgYQfSdxS-L6XJo9S8aqBS_oOxxydOjXDox58pMc2OVQOFuqWm6flEe8i2jzx7-GFU9-m12XBipX0fpZi-0i8EjPjxOsBNFy1dPA9sTFXMlciPcYSGfQ5EnQRpt1B0PTWYlQqcpyT9km0RoBOc9rdO-H01DPdfgB4cpRpacenRd4w_Q408kQhcDhyuKsSh5PpG3RGrAHQBe-f-ZLrixvmlSL7QaZp7pkfdjfXHO6pYdMO1sifWwa832AsFovarXZ6eKG0"
export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://graphql.anilist.co',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
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
        // console.log('API Response:', JSON.stringify(response, null, 2));
        
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