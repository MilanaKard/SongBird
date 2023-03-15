import './NotFound.scss';
import { useAppSelector } from '../../../hooks/redux';
const NotFound = (): JSX.Element => {
  const { dictionary } = useAppSelector((state) => state.language);
  return (
    <div>
      <h1>{dictionary.error404}</h1>
      <p>{dictionary.pageNotFound}</p>
    </div>
  );
};

export default NotFound;
