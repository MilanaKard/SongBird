import Card from '../../Card/Card';
import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import styles from './Gallery.module.scss';
import { BirdData } from '../../../types/Types';
import Loader from '../../Loader/Loader';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import { useGetBirdsQuery } from '../../../store/api';

const Gallery = (): JSX.Element => {
  const { language, dictionary } = useAppSelector((state) => state.language);
  const birdData = useAppSelector((state) => state.quiz.birds);
  const [currentBirdId, setCurrentBirdId] = useState('');

  const { isError, isLoading, isFetching } = useGetBirdsQuery();

  const audio = useRef() as React.RefObject<HTMLAudioElement>;

  useEffect(() => {
    if (currentBirdId) (audio.current as HTMLAudioElement).play();
  }, [currentBirdId]);

  const getBirdById = (id: string) => {
    return birdData?.find((bird) => bird.id === id);
  };

  const getAudioSrcByBirdById = (id: string) => {
    const bird = getBirdById(id);
    return bird ? bird.audio : '';
  };

  const imageStyle = {
    backgroundImage: `url(${currentBirdId !== '' ? getBirdById(currentBirdId)?.image || '' : ''})`,
    width: '7rem',
    height: '7rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (!el.closest('.card')) return;
    const card = el.closest('.card') as HTMLElement;
    const player = document.getElementById('player') as HTMLElement;
    player.style.bottom = '0';
    selectCard(card);
  };

  const onPlayButtonClick = () => {
    const card = document.getElementById(currentBirdId);
    card?.classList.toggle('active');
  };

  const selectCard = (card: HTMLElement) => {
    if (!card.classList.contains('active')) {
      document.querySelectorAll('.card').forEach((el) => el.classList.remove('active'));
      card.classList.add('active');
      if (currentBirdId !== card.id) {
        setCurrentBirdId(card.id);
      }
      (audio.current as HTMLAudioElement).play();
      return;
    }
    card.classList.remove('active');
    (audio.current as HTMLAudioElement).pause();
  };

  const playPrev = () => {
    let currentIndex = (birdData as BirdData[]).findIndex((bird) => bird.id === currentBirdId);
    if (currentIndex < 1) currentIndex = (birdData as BirdData[]).length;
    const card = document.getElementById(
      (birdData as BirdData[])[currentIndex - 1].id
    ) as HTMLElement;
    selectCard(card);
  };

  const playNext = () => {
    let currentIndex = (birdData as BirdData[]).findIndex((bird) => bird.id === currentBirdId);
    if (currentIndex >= (birdData as BirdData[]).length - 1) currentIndex = -1;
    const card = document.getElementById(
      (birdData as BirdData[])[currentIndex + 1].id
    ) as HTMLElement;
    selectCard(card);
  };

  return (
    <div className="container">
      <div className={styles['cards-container']} onClick={handleCardClick}>
        {birdData?.map((bird) => (
          <Card
            key={bird.id}
            id={bird.id}
            audio={bird.audio}
            name={bird.name[language]}
            description={bird.species[language]}
            image={bird.image}
            species={bird.description}
            cardType="gallery"
          >
            <div className="card__controls"></div>
          </Card>
        ))}
        {(isLoading || isFetching) && <Loader />}
        {isError && dictionary.error}
      </div>
      <AudioPlayer
        audioSrc={getAudioSrcByBirdById(currentBirdId)}
        type="gallery"
        onAudioEnded={playNext}
        audio={audio}
        leftControl={<button className="play-prev player__icon" onClick={playPrev}></button>}
        rightControl={<button className="play-next player__icon" onClick={playNext}></button>}
        onPlayButtonClick={onPlayButtonClick}
        image={<div style={imageStyle}></div>}
      />
    </div>
  );
};

export default Gallery;
