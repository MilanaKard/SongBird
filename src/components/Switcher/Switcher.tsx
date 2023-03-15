import './Switcher.scss';
import { useAppSelector } from '../../hooks/redux';
import { Languages } from '../../translation/translation';
import { useActions } from '../../hooks/actions';

const direction = {
  en: 'left',
  ru: 'right',
};

const Switcher = (): JSX.Element => {
  const { language } = useAppSelector((state) => state.language);
  const { setLanguage } = useActions();

  const handleClick = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (!el.classList.contains('tab') || el.classList.contains('active')) return;
    const language = (el.dataset.language as Languages) || 'en';
    setLanguage(language);
  };

  return (
    <div className="wrapper">
      <div className={`tab-switch ${direction[language]}`} onClick={handleClick}>
        <div
          className={`tab ${language === 'en' ? 'active' : ''}`}
          data-direction={direction.en}
          data-language="en"
        >
          En
        </div>
        <div
          className={`tab ${language === 'ru' ? 'active' : ''}`}
          data-direction={direction.ru}
          data-language="ru"
        >
          Ru
        </div>
      </div>
    </div>
  );
};

export default Switcher;
