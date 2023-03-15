import styles from './MainButton.module.scss';

type MainButtonProps = {
  isDisabled: boolean;
  onClick: () => void;
};

const MainButton = (props: React.PropsWithChildren<MainButtonProps>): JSX.Element => {
  const { isDisabled, onClick, children } = props;
  const handleButtonClick = () => {
    if (isDisabled) return;
    onClick();
  };
  return (
    <button
      onClick={handleButtonClick}
      className={isDisabled ? styles['button-disabled'] : styles.button}
      role="button"
    >
      {children}
    </button>
  );
};

export default MainButton;
