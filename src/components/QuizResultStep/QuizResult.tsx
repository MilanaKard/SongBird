import './QuizResult.scss';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import MainButton from '../Button/MainButton';
import Popup from '../Popup/Popup';
import { useState } from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAddPlayerMutation } from '../../store/api';

const QuizResult = (): JSX.Element => {
  const { clearProgress, setCurrentName, setIsResultSaved } = useActions();
  const { score, currentName, progressByLevel, currentLevel } = useAppSelector(
    (state) => state.quiz
  );
  const { isResultSaved } = useAppSelector((state) => state.result);
  const { dictionary } = useAppSelector((state) => state.language);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState(dictionary.resultIsSaved);
  const componentRef = useRef(null);
  const [addPlayer] = useAddPlayerMutation();

  const handlePlayAgainButtonClick = () => {
    console.log(progressByLevel);
    clearProgress();
    setIsResultSaved(false);
  };

  const getDate = () => {
    return new Date();
  };

  const showPopup = (text: string) => {
    setPopupText(text);
    setIsPopupVisible(true);
  };

  const handleSaveResultButtonClick = async () => {
    if (!currentName) {
      showPopup(dictionary.plaeseEnterName);
      return;
    }
    if (isResultSaved) {
      showPopup(dictionary.resultHasAlredyBeenSaved);
      return;
    }
    if (isResultSaved == undefined) {
      showPopup(dictionary.plaeseWaitUntilResultIsSaved);
      return;
    }
    const result = {
      date: getDate(),
      name: currentName,
      score,
    };
    setIsResultSaved(undefined);
    try {
      await addPlayer(result);
      setIsResultSaved(true);
      showPopup(dictionary.resultIsSaved);
    } catch {
      showPopup(dictionary.error);
      setIsResultSaved(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(event.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrintButtonClick = () => {
    if (!currentName) {
      showPopup(dictionary.plaeseEnterName);
      return;
    }
    handlePrint();
  };

  return (
    <>
      <div className="congratulations" ref={componentRef}>
        <p className="congratulations__title">{dictionary.congratulations}</p>
        <input
          type="text"
          className="congratulations__name"
          value={currentName}
          onChange={handleNameChange}
          placeholder={`[${dictionary.enterName}]`}
        />
        <p className="congratulations__text">
          {dictionary.resultPart1}
          {score}
          {dictionary.resultPart3}
        </p>
        <div className="congratulations__image"></div>
      </div>
      <div className="buttons">
        <MainButton onClick={handlePlayAgainButtonClick} isDisabled={false}>
          {dictionary.playAgain}
        </MainButton>
        <MainButton onClick={handleSaveResultButtonClick} isDisabled={false}>
          {dictionary.saveResult}
        </MainButton>
        <MainButton onClick={handlePrintButtonClick} isDisabled={false}>
          {dictionary.print}
        </MainButton>
      </div>
      <Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
        <p>{popupText}</p>
      </Popup>
    </>
  );
};

export default QuizResult;
