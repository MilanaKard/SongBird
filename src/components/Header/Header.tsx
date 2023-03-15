import { NavLink } from 'react-router-dom';
import './Header.scss';
import Switcher from '../Switcher/Switcher';
import { useAppSelector } from '../../hooks/redux';

const Header = (): JSX.Element => {
  const { dictionary } = useAppSelector((state) => state.language);
  return (
    <div className="header">
      <div className="container header__container">
        <NavLink to="/">
          <div className="logo">
            <div className="logo__image"></div>
            <h1 className="logo__text">Song</h1>
          </div>
        </NavLink>
        <div className="navigation">
          <NavLink to="/quiz">{dictionary.quiz}</NavLink>
          <NavLink to="/gallery">{dictionary.gallery}</NavLink>
          <NavLink to="/statistics">{dictionary.statistics}</NavLink>
        </div>
        <Switcher />
      </div>
    </div>
  );
};

export default Header;
