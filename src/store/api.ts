import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BirdData, ServerResponse, PlayerData } from '../types/Types';

export const birdApi = createApi({
  reducerPath: 'bird/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://song-bird-api.netlify.app/.netlify/functions/api',
  }),
  endpoints: (build) => ({
    getBirds: build.query<BirdData[], void>({
      query: () => ({
        url: `bird`,
      }),
      transformResponse: (response: ServerResponse<BirdData>) => response || [],
    }),
    getBirdsByLevel: build.query<BirdData[], string>({
      query: (level) => ({
        url: `bird?level=${level}`,
      }),
      transformResponse: (response: ServerResponse<BirdData>) => response || [],
    }),
    getPlayers: build.query<PlayerData[], void>({
      query: () => ({
        url: `player`,
      }),
      transformResponse: (response: ServerResponse<PlayerData>) => response || [],
    }),
    addPlayer: build.mutation({
      query: (post) => ({
        url: `player`,
        method: 'POST',
        body: post,
      }),
    }),
  }),
});

export const {
  useGetBirdsQuery,
  useGetBirdsByLevelQuery,
  useAddPlayerMutation,
  useGetPlayersQuery,
} = birdApi;
