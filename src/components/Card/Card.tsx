import './Card.scss';
import { useAppSelector } from '../../hooks/redux';

type CardProps = {
  key: string;
  id: string;
  audio: string;
  name: string;
  description: string;
  image: string;
  species: string;
  cardType: string;
};

const Card = (props: React.PropsWithChildren<CardProps>): JSX.Element => {
  const { dictionary } = useAppSelector((state) => state.language);
  const { id, name, description, image, species, cardType, children } = props;
  return (
    <div className={`card card--${cardType}`} id={id as string} data-testid="card">
      <div className="card__img" data-testid="image" style={{ backgroundImage: `url(${image})` }}>
        {children}
      </div>
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <p className="card__additional">
          {dictionary.species} {species}
        </p>
        <p className="card__description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
