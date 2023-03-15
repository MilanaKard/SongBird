import './Answer.scss';
import { useActions } from '../../hooks/actions';

type AnswerPropsType = {
  id: string;
  text: string;
  isCorrect: boolean;
  isClicked: boolean;
  isCurrent: boolean;
};

const Answer = (data: AnswerPropsType): JSX.Element => {
  const { id, text, isCorrect, isClicked, isCurrent } = data;
  const { onAnswerClick } = useActions();

  const handleClick = () => {
    onAnswerClick(id);
  };
  return (
    <li
      className={`answer ${!isClicked ? '' : isCorrect ? 'answer--correct' : 'answer--wrong'} ${
        isCurrent ? 'active' : ''
      }`}
      onClick={handleClick}
    >
      {text}
    </li>
  );
};

export default Answer;
