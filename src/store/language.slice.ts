import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dictionary, Languages } from '../translation/translation';

interface LanguageState {
  language: Languages;
  dictionary: typeof dictionary.en;
}

const lang = ['en', 'ru'].includes(navigator.language.substring(0, 2))
  ? (navigator.language.substring(0, 2) as Languages)
  : 'en';

const initialState: LanguageState = {
  dictionary: dictionary[lang],
  language: lang,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Languages>) {
      state.language = action.payload;
      state.dictionary = dictionary[action.payload];
    },
  },
});

export const languageActions = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
