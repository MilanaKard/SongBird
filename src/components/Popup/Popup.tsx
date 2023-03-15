import './Popup.scss';

type PopupPropsType = {
  isVisible: boolean;
  onClose: () => void;
};

const Popup = (props: React.PropsWithChildren<PopupPropsType>): JSX.Element => {
  const { isVisible, onClose, children } = props;
  const handleCloseClick = (e: React.MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest('.popup-content') ||
      (e.target as HTMLElement).classList.contains('popup-close')
    )
      onClose();
  };
  return (
    <div className={`popup ${isVisible ? 'open' : ''}`}>
      <div className="popup-body" onClick={handleCloseClick}>
        <div className="popup-content">
          <div className="popup-close"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
