import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.scss';
import { calculateTime } from '../../Utils';

type AudioPlayerProps = {
  audioSrc: string;
  type: 'gallery' | 'quiz';
  onAudioEnded: () => void;
  onPlayButtonClick: () => void;
  audio: React.RefObject<HTMLAudioElement>;
  leftControl: React.ReactNode | null;
  rightControl: React.ReactNode | null;
  image: React.ReactNode | null;
};

const AudioPlayer = (props: React.PropsWithChildren<AudioPlayerProps>): JSX.Element => {
  const {
    audioSrc,
    type,
    onAudioEnded,
    onPlayButtonClick,
    leftControl,
    rightControl,
    audio,
    image,
  } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSound, setIsSound] = useState(true);
  const [defaultVolume, setDefaultVolume] = useState(0.5);

  const progressBar = useRef() as React.RefObject<HTMLInputElement>;
  const volume = useRef() as React.RefObject<HTMLInputElement>;
  const animationRef = useRef() as React.RefObject<number>;

  const handleLoadedMetadata = () => {
    const seconds = Math.floor((audio.current as HTMLAudioElement).duration);
    setDuration(seconds);
  };

  useEffect(() => {
    (animationRef.current as number) = requestAnimationFrame(whilePlaying);
    return () => {
      cancelAnimationFrame(animationRef.current as number);
    };
  }, []);

  const handlePlayButtonClick = () => {
    onPlayButtonClick();
    if (!(audio.current as HTMLAudioElement).paused) {
      (audio.current as HTMLAudioElement).pause();
      return;
    }
    (audio.current as HTMLAudioElement).play();
  };

  const whilePlaying = () => {
    if (typeof audio.current?.currentTime !== 'undefined') {
      (progressBar.current as HTMLInputElement).value = (
        (audio.current as HTMLAudioElement).currentTime * 100
      ).toString();
      changePlayerCurrentTime();
    }
    (animationRef.current as number) = requestAnimationFrame(whilePlaying);
  };

  const changePlayerCurrentTime = () => {
    (progressBar.current as HTMLInputElement).style.setProperty(
      '--seek-before-width-progress',
      `${
        (Math.floor(Number((progressBar.current as HTMLInputElement).value)) /
          Number((progressBar.current as HTMLInputElement).max)) *
        100
      }%`
    );
    setCurrentTime(Math.floor(Number((progressBar.current as HTMLInputElement).value) / 100));
  };

  const handleSoundButtonClick = () => {
    if (isSound) {
      setDefaultVolume(Number((volume.current as HTMLInputElement).value));
      setIsSound(false);
      (volume.current as HTMLInputElement).value = '0';
      (audio.current as HTMLAudioElement).volume = 0;
      updateVolumeInput(0);
      return;
    }
    (volume.current as HTMLInputElement).value = defaultVolume.toString();
    setIsSound(true);
    (audio.current as HTMLAudioElement).volume = defaultVolume;
    updateVolumeInput(defaultVolume);
  };

  const updateVolumeInput = (value: number) => {
    (volume.current as HTMLInputElement).style.setProperty(
      '--seek-before-width-volume',
      `${value * 100}%`
    );
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value === 0) {
      handleSoundButtonClick();
      return;
    }
    setDefaultVolume(value);
    setIsSound(true);
    (audio.current as HTMLAudioElement).volume = value;
    updateVolumeInput(value);
  };

  const onProgressChange = () => {
    (audio.current as HTMLAudioElement).currentTime = Number(
      Math.floor(Number((progressBar.current as HTMLInputElement).value) / 100)
    );
    changePlayerCurrentTime();
  };

  const handleAudioEnded = () => {
    onAudioEnded();
  };

  return (
    <div className={`player player--${type}`} id="player">
      <div className="container player-container">
        <audio
          src={audioSrc}
          ref={audio}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onEnded={handleAudioEnded}
        ></audio>
        {image}
        <div className="player__controls">
          {leftControl}
          <button
            className={`play player__icon ${isPlaying ? 'active' : ''}`}
            onClick={handlePlayButtonClick}
          ></button>
          {rightControl}
        </div>
        <div className="progress__controls">
          <p className="player__time current-time">{calculateTime(currentTime)}</p>
          <input
            type="range"
            min="0"
            max={duration * 100 || 0}
            step="1"
            defaultValue={0}
            ref={progressBar}
            onChange={onProgressChange}
            className="progress-bar"
          />
          <p className="player__time total-time">{calculateTime(duration)}</p>
        </div>
        <div className="player__controls">
          <button
            className={`sound player__icon ${isSound ? 'active' : ''}`}
            onClick={handleSoundButtonClick}
          ></button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            ref={volume}
            defaultValue={defaultVolume}
            className="volume"
            id="volume"
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
