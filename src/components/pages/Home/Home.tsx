import './Home.scss';
import MainButton from '../../Button/MainButton';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { dictionary } = useAppSelector((state) => state.language);
  const navigate = useNavigate();
  return (
    <div className="container home__container">
      <div className="home__info">
        <p className="home__description">{dictionary.gameDescription}</p>
        <MainButton
          isDisabled={false}
          onClick={() => {
            navigate('quiz');
          }}
        >
          {dictionary.playGame}
        </MainButton>
      </div>
      <div className="home__image"></div>
    </div>
  );
};

export default Home;
