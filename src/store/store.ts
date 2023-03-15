import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { quizReducer } from './quiz.slice';
import { resultReducer } from './result.slice';
import { languageReducer } from './language.slice';
import { birdApi } from './api';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    [birdApi.reducerPath]: birdApi.reducer,
    language: languageReducer,
    result: resultReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(birdApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
