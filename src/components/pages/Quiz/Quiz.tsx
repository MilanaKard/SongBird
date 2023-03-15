import QuizQuestionStep from '../../QuizQuestionStep/QuizQuestionStep';
import { useAppSelector } from '../../../hooks/redux';
import { useActions } from '../../../hooks/actions';
import { useEffect } from 'react';
import QuizProgress from '../../QuizProgress/QuizProgress';
import QuizResult from '../../QuizResultStep/QuizResult';
import { QUESTIONS_COUNT } from '../../../constants/constants';

const Quiz = (): JSX.Element => {
  const { progressByLevel, currentLevel, score } = useAppSelector((state) => state.quiz);
  const { dictionary } = useAppSelector((state) => state.language);
  const { getLevel } = useActions();

  useEffect(() => {
    getLevel(currentLevel);
  }, [currentLevel]);

  return (
    <div className="container">
      {
        <>
          <p className="score">
            {dictionary.scoreText} {score}
          </p>
          <QuizProgress />
          {currentLevel < QUESTIONS_COUNT && progressByLevel[currentLevel] && <QuizQuestionStep />}
          {currentLevel === QUESTIONS_COUNT && <QuizResult />}
        </>
      }
    </div>
  );
};

export default Quiz;
