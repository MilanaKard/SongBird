import React from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

type GalleryAudioPlayerProps = {
  audioSrc: string;
  onPlayPrevButtonClick: () => void;
  onPlayNextButtonClick: () => void;
  audio: React.RefObject<HTMLAudioElement>;
};

const GalleryAudioPlayer = (props: GalleryAudioPlayerProps): JSX.Element => {
  const { onPlayPrevButtonClick, onPlayNextButtonClick, audioSrc, audio } = props;

  return (
    <AudioPlayer
      audioSrc={audioSrc}
      type="gallery"
      onAudioEnded={onPlayNextButtonClick}
      audio={audio}
      leftControl={
        <button className="play-prev player__icon" onClick={onPlayPrevButtonClick}></button>
      }
      rightControl={
        <button className="play-next player__icon" onClick={onPlayNextButtonClick}></button>
      }
      onPlayButtonClick={function (): void {
        throw new Error('Function not implemented.');
      }}
      image={null}
    />
  );
};

export default GalleryAudioPlayer;
