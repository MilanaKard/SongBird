import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { birdApi } from './api';
import { PlayerData } from '../types/Types';

type sortParamsType = {
  sortBy: 'score';
  order: 'asc' | 'desc';
};

const initialState = {
  results: [] as PlayerData[],
  currentResults: [] as PlayerData[],
  isResultSaved: false as boolean | undefined,
  currentPage: 0,
  pageCount: 0,
  sortParams: { sortBy: 'score', order: 'desc' } as sortParamsType,
  resultsPerPage: 15,
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
      state.currentResults = state.results.slice(
        state.currentPage * state.resultsPerPage,
        state.currentPage * state.resultsPerPage + state.resultsPerPage
      );
    },
    setIsResultSaved(state, action) {
      state.isResultSaved = action.payload;
    },
    sortResults(state, action: PayloadAction<sortParamsType>) {
      state.sortParams = action.payload;
      switch (action.payload.sortBy) {
        case 'score':
          state.results.sort((a, b) =>
            action.payload.order === 'asc'
              ? Number(a[action.payload.sortBy]) - Number(b[action.payload.sortBy])
              : Number(b[action.payload.sortBy]) - Number(a[action.payload.sortBy])
          );
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(birdApi.endpoints.getPlayers.matchFulfilled, (state, { payload }) => {
      state.results = payload;
      state.pageCount = Math.ceil(payload.length / state.resultsPerPage);
    });
  },
});

export const resultActions = resultSlice.actions;
export const resultReducer = resultSlice.reducer;
