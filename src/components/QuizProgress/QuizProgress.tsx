import './QuizProgress.scss';
import { QUESTIONS_COUNT } from '../../constants/constants';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

const QuizProgress = () => {
  const { currentLevel, progressByLevel } = useAppSelector((state) => state.quiz);
  const { setCurrentLevel } = useActions();
  return (
    <div className="progress-container">
      <div
        className="progress"
        id="progress"
        style={{
          width: `${((Object.keys(progressByLevel).length - 1) / QUESTIONS_COUNT) * 100}%`,
        }}
      ></div>
      {Array(QUESTIONS_COUNT + 1)
        .fill(0)
        .map((_, index) => (
          <div
            className={`circles ${
              Object.keys(progressByLevel).length - 1 >= index ? 'active' : ''
            } ${currentLevel === index ? 'current' : ''} ${
              index === QUESTIONS_COUNT ? 'finish' : ''
            }`}
            key={index}
            onClick={() => {
              if (
                (progressByLevel[index.toString()] ||
                  (index === QUESTIONS_COUNT && progressByLevel[(index - 1).toString()])) &&
                currentLevel !== index
              ) {
                setCurrentLevel(index);
              }
            }}
          >
            {index + 1}
          </div>
        ))}
    </div>
  );
};

export default QuizProgress;
