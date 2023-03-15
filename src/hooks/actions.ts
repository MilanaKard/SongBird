import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { quizActions } from '../store/quiz.slice';
import { languageActions } from '../store/language.slice';
import { resultActions } from '../store/result.slice';

const actions = {
  ...quizActions,
  ...languageActions,
  ...resultActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
