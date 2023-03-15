import { createSlice } from '@reduxjs/toolkit';
import { BirdData } from '../types/Types';
import { ANSWERS_COUNT, QUESTIONS_COUNT } from '../constants/constants';
import { playCorrectSound, playWrongSound } from '../Utils';
import { birdApi } from './api';

interface QuizState {
  birds: BirdData[];
  currentLevel: number;
  score: number;
  currentName: string;
  progressByLevel: {
    [index: string]: {
      clickedBirdsIds: string[];
      currentBirdId: string;
      correctBirdId: string;
      correctBirdNumber: number;
    };
  };
}

const initialState: QuizState = {
  birds: [],
  currentLevel: 0,
  score: 0,
  currentName: '',
  progressByLevel: {},
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    getLevel(state, action) {
      const level = action.payload;
      if (level > QUESTIONS_COUNT || level < 0) return;
      state.currentLevel = level;
      if (state.progressByLevel.hasOwnProperty(level.toString())) return;
      const min = 0;
      const max = ANSWERS_COUNT;
      const randomNumber = Math.floor(Math.random() * (max - min)) + min;
      state.progressByLevel[level] = {
        clickedBirdsIds: [],
        currentBirdId: '',
        correctBirdId: '',
        correctBirdNumber: randomNumber,
      };
    },
    clearProgress(state) {
      state.progressByLevel = {};
      state.currentName = '';
      state.score = 0;
      state.currentLevel = 0;
    },
    setCurrentName(state, action) {
      state.currentName = action.payload;
    },
    setCurrentLevel(state, action) {
      state.currentLevel = action.payload;
    },
    onAnswerClick(state, action) {
      const level = state.currentLevel;
      if (
        !state.progressByLevel[level].clickedBirdsIds.includes(action.payload) &&
        !state.progressByLevel[level].clickedBirdsIds.includes(
          state.progressByLevel[level].correctBirdId
        )
      ) {
        if (action.payload === state.progressByLevel[level].correctBirdId) {
          const attemptsCount = state.progressByLevel[level].clickedBirdsIds.length;
          switch (attemptsCount) {
            case 0:
              state.score += 5;
              break;
            case 1:
              state.score += 4;
              break;
            case 2:
              state.score += 3;
              break;
            case 3:
              state.score += 2;
              break;
            case 4:
              state.score += 1;
              break;
          }
          playCorrectSound();
        } else {
          playWrongSound();
        }
        state.progressByLevel[level].clickedBirdsIds.push(action.payload);
      }
      state.progressByLevel[level].currentBirdId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(birdApi.endpoints.getBirds.matchFulfilled, (state, { payload }) => {
      state.birds = payload;
    });
    builder.addMatcher(birdApi.endpoints.getBirdsByLevel.matchFulfilled, (state, { payload }) => {
      const progress = state.progressByLevel[state.currentLevel];
      progress.correctBirdId = payload[progress.correctBirdNumber].id;
    });
  },
});

export const quizActions = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
