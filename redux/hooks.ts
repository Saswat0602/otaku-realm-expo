// Re-export all API hooks from a central location
import { useSeasonalAnimeQuery } from './api/animeApi';
import { useAnimeDetailsQuery } from './api/detailsApi';
import {
  useGetAllGenresQuery,
  useGetAnimeByGenreQuery,
  useGetAnimeByStudioQuery
} from './api/genresApi';
import { useSearchAnimeQuery } from './api/searchApi';
import { useTop100AnimeQuery } from './api/top100AnimeApi';
import { useUpcomingAnimeQuery } from './api/upcomingAnimeApi';

import type { AppDispatch, RootState } from './store';

export {
  AppDispatch,
  // Types
  RootState, useAnimeDetailsQuery, useGetAllGenresQuery,
  useGetAnimeByGenreQuery,
  useGetAnimeByStudioQuery, useSearchAnimeQuery, useSeasonalAnimeQuery, useTop100AnimeQuery, useUpcomingAnimeQuery
};
