import './QuizQuestionStep.scss';
import Question from '../Question/Question';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import Answer from '../Answer/Answer';
import { BirdData } from '../../types/Types';
import Card from '../Card/Card';
import MainButton from '../Button/MainButton';
import { useGetBirdsByLevelQuery } from '../../store/api';
import Loader from '../Loader/Loader';

const QuizQuestionStep = (): JSX.Element => {
  const { setCurrentLevel } = useActions();
  const { currentLevel, progressByLevel } = useAppSelector((state) => state.quiz);
  const { language, dictionary } = useAppSelector((state) => state.language);
  const { data, isError, isFetching, isLoading } = useGetBirdsByLevelQuery(
    currentLevel.toString(),
    { refetchOnMountOrArgChange: true }
  );

  const getBirdById = (id: string) => data?.find((bird) => bird.id === id);
  const correctBird = getBirdById(progressByLevel[currentLevel].correctBirdId) as BirdData;
  const currentBird = getBirdById(progressByLevel[currentLevel].currentBirdId) as BirdData;

  const onNextButtonClick = () => {
    setCurrentLevel(currentLevel + 1);
  };

  const onPrevButtonClick = () => {
    setCurrentLevel(currentLevel - 1);
  };

  return (
    <>
      <div className="qu"></div>
      {data && correctBird && (
        <div>
          <Question
            birdName={correctBird.name[language]}
            audioSrc={correctBird.audio}
            imgSrc={correctBird.image}
            isGuessed={progressByLevel[currentLevel].clickedBirdsIds.includes(correctBird.id)}
          />
          <div className="answers">
            <ul className="answers__list">
              {data?.map((answer) => (
                <Answer
                  key={answer.id}
                  id={answer.id}
                  text={answer.name[language]}
                  isCorrect={answer.id === correctBird.id}
                  isClicked={progressByLevel[currentLevel].clickedBirdsIds.includes(answer.id)}
                  isCurrent={currentBird && currentBird.id === answer.id}
                />
              ))}
            </ul>
            {currentBird && (
              <Card
                key={currentBird.id}
                id={currentBird.id}
                audio={currentBird.audio}
                name={currentBird.name[language]}
                description={currentBird.species[language]}
                image={currentBird.image}
                species={currentBird.description}
                cardType={'quiz'}
              ></Card>
            )}
          </div>
          <div className="buttons-container">
            <MainButton onClick={onPrevButtonClick} isDisabled={currentLevel === 0}>
              &#8592;
            </MainButton>
            <MainButton
              isDisabled={!progressByLevel[currentLevel].clickedBirdsIds.includes(correctBird.id)}
              onClick={onNextButtonClick}
            >
              &#8594;
            </MainButton>
          </div>
        </div>
      )}
      {(isLoading || isFetching) && <Loader />}
      {isError && dictionary.error}
    </>
  );
};

export default QuizQuestionStep;
